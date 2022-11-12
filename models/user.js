const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

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
    constructor(id, name, email, password, salt, isActive) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.salt = salt
        this.isActive = isActive;
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
                const checkEmailExist = item.find((p) => p.email === this.email);
                if (checkEmailExist) {
                    cb(generic.jsonRes(400, "Email already exists!!!"));
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

};
