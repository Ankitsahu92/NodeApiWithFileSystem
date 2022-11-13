const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const generic = require("../util/output.service");
const p = path.join(path.dirname(__dirname), "data", "user.json");

const getFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class User {
    constructor(id, name, userName, password, isActive, userType) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.password = password;
        this.isActive = isActive;
        this.userType = userType;
    }

    save(cb) {
        getFromFile((item) => {
            if (this.id) {
                const existingitemIndex = item.findIndex((prod) => prod.id === this.id);
                const updateditem = [...item];
                updateditem[existingitemIndex] = this;
                fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                    cb(generic.jsonRes(400, "Something went wrong!!!"));
                });
                cb(generic.jsonRes(200, "Record updated successfully!!!"));
            } else {
                const checkUserNameExist = item.find((p) => p.userName === this.userName);
                if (checkUserNameExist) {
                    cb(generic.jsonRes(400, "User Name already exists!!!"));
                } else {
                    this.id = uuid();
                    item.push(this);
                    fs.writeFile(p, JSON.stringify(item), (err) => {
                        cb(generic.jsonRes(400, "Something went wrong!!!"));
                    });
                    cb(generic.jsonRes(200, "Record saved successfully!!!", this.id));
                }
            }
        });
    }

    static deleteById(id, cb) {
        getFromFile((item) => {
            const findItem = item.find((p) => p.id === id);
            if (findItem) {
                const updateditem = item.filter((prod) => prod.id !== id);
                fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                    if (!err) {
                        cb(generic.jsonRes(400, "Something went wrong!!!"));
                    }
                });
                cb(generic.jsonRes(200, "Record deleted successfully!!!"))
            } else {
                cb(generic.jsonRes(400, "Something went wrong!!!"))
            }
        });
    }

    static fetchAll(cb) {
        getFromFile(cb);
    }

    static findById(id, cb) {
        getFromFile((item) => {
            const finditem = item.find((p) => p.id === id);
            cb(finditem);
        });
    }

    static updateUserDetailsById(userObj, cb) {
        getFromFile((item) => {
            const findIndex = item.findIndex((p) => p.id === userObj.id);
            console.log("findIndex", findIndex);
            if (findIndex >= 0) {
                const finditem = item[findIndex];
                Object.keys(userObj).map(k => finditem[k] = userObj[k]);
                const updateditem = [...item];
                updateditem[findIndex] = finditem;
                fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                    cb(generic.jsonRes(400, "Something went wrong!!!"));
                });
                cb(generic.jsonRes(200, "Record updated successfully!!!"));
            } else {
                cb(generic.jsonRes(400, "Something went wrong!!!"));
            }
        });
    }


    static async auth(userObj, cb) {
        await getFromFile(async (item) => {
            const findIndex = item.findIndex((p) => p.userName === userObj.userName);
            if (findIndex >= 0) {
                const user = item[findIndex];
                if (!user) {
                    cb(generic.jsonRes(400, "Invalid credentials!!!"));
                }

                console.log("user", user);
                const isMatch = await bcrypt.compare(userObj.password, user.password);
                if (!isMatch) {
                    cb(generic.jsonRes(400, "Invalid credentials!!!"));
                }

                const payload = {
                    user: {
                        id: user.id,
                        name: user.name,
                        userType: user.userType
                    },
                };

                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: 360000 },
                    (err, token) => {
                        if (err) {
                            throw err;
                        }
                        cb(generic.jsonRes(200, "Login successfully!!!", { token }));
                    }
                );


            } else {
                cb(generic.jsonRes(400, "User does not exist!!!"));
            }
        });
    }
};
