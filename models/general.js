const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const generic = require("../util/output.service");
let p = null;

const getFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

const initializePath = (fileName) => {
    if (!p) {
        p = path.join(path.dirname(__dirname), "data", `${fileName}.json`);
    }
};

module.exports = class General {
    constructor(fileName) {
        initializePath(fileName);
        if (!fs.existsSync(p)) {
            fs.writeFile(p, "[]", function (err) {
                if (err) throw err;
            });
        }
    }
    static async AddUpdate(obj, cb) {
        await getFromFile(async (item) => {
            if (obj && obj.id) {
                const findIndex = item.findIndex((p) => p.id === obj.id);
                if (findIndex >= 0) {
                    const finditem = item[findIndex];
                    Object.keys(obj).map((k) => (finditem[k] = obj[k]));
                    const updateditem = [...item];
                    updateditem[findIndex] = finditem;
                    fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                        if (err) {
                            cb(generic.jsonRes(400, "Something went wrong!!!"));
                        }
                    });
                    cb(generic.jsonRes(200, "Record Updated Successfully!!!"));
                }
                cb(generic.jsonRes(400, "Record Not Found!!!"));
            } else {
                const id = uuid();
                const updateditem = [...item];
                updateditem.push({ ...obj, id });
                fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                    if (err) {
                        cb(generic.jsonRes(400, "Something went wrong!!!"));
                    }
                });
                cb(generic.jsonRes(201, "Record Added successfully!!!", id));
            }
        });
    }

    static fetchAll(cb) {
        getFromFile((item) => {
            cb(generic.jsonRes(200, "Record Retrived Successfully!!!", item));
        });
    }

    static findById(id, value, cb) {
        if (!id) {
            id = "id";
        }

        getFromFile((item) => {
            const finditem = item.find((p) => p[id] === value);
            cb(generic.jsonRes(200, "Record Retrived Successfully!!!", finditem));
        });
    }

    static deleteById(id, value, cb) {
        getFromFile((item) => {
            const findItem = item.find((p) => p[id] === value);
            if (findItem) {
                const updateditem = item.filter((p) => p[id] !== value);
                fs.writeFile(p, JSON.stringify(updateditem), (err) => {
                    if (!err) {
                        cb(generic.jsonRes(400, "Something went wrong!!!"));
                    }
                });
                cb(generic.jsonRes(200, "Record Deleted successfully!!!"));
            } else {
                cb(generic.jsonRes(400, "Something went wrong!!!"));
            }
        });
    }
};
