const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const generic = require("../util/output.service");
let p = path.join(path.dirname(__dirname), "data", "users.json");
const moment = require("moment");

const getFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Common {
    constructor(fileName) {
        p = path.join(path.dirname(__dirname), "data", `${fileName}.json`);
        if (!fs.existsSync(p)) {
            fs.writeFile(p, "[]", function (err) {
                if (err) throw err;
            });
        }
    }

    static getBeneficiary(id, cb) {
        getFromFile((item) => {
            const finditem = item.filter((p) => p.userID !== id && p.isEnabled === true);
            cb(generic.jsonRes(200, "Record Retrived Successfully!!!", finditem.map(i => {
                return {
                    accountNumber: i.accountNumber,
                    id: i.id,
                    typeOfAccount: id.typeOfAccount
                }
            })));
        });
    }

    static tranferMoney(body, cb) {
        getFromFile((item) => {

            if (body.amount <= 0) {
                cb(generic.jsonRes(400, "Tranfer amount should grater then 0!!!"));
                return;
            }

            const tranferFrom = item.find((p) => p.id == body.tranferFromID);
            const tranferTo = item.find((p) => p.id == body.tranferToID);


            if (!tranferFrom) {
                cb(generic.jsonRes(400, "Invalid Tranfer From Account !!!"));
                return;
            }
            if (!tranferTo) {
                cb(generic.jsonRes(400, "Invalid Tranfer To Account !!!"));
                return;
            }
            if (+tranferFrom.initialDeposit <= body.amount) {
                cb(generic.jsonRes(400, "Insufficient Balance!!!"));
                return;
            }
            const refNumber = moment().format("DDMMYYHHMMSS")
            tranferFrom.initialDeposit = +tranferFrom.initialDeposit - body.amount;
            const tranferFromTransaction = tranferFrom?.transaction || [];
            tranferFromTransaction.push({
                date: moment(),
                amount: body.amount,
                transactionType: "DR",
                referenceNumber: refNumber,
                comment: body.comment || "",
                tranferAccount: tranferTo.accountNumber
            });
            tranferFrom.transaction = tranferFromTransaction;

            tranferTo.initialDeposit = +tranferTo.initialDeposit + body.amount;
            const tranferToTransaction = tranferTo?.transaction || [];
            tranferToTransaction.push({
                date: moment(),
                amount: body.amount,
                transactionType: "CR",
                referenceNumber: refNumber,
                comment: body.comment || "",
                tranferAccount: tranferFrom.accountNumber
            });
            tranferTo.transaction = tranferToTransaction;

            const tranferFromIndex = item.findIndex((p) => p.id === body.tranferFromID);
            const tranferToIndex = item.findIndex((p) => p.id === body.tranferToID);

            const copyItem = [...item]
            copyItem[tranferFromIndex] = tranferFrom;
            copyItem[tranferToIndex] = tranferTo;

            fs.writeFile(p, JSON.stringify(copyItem), (err) => {
                cb(generic.jsonRes(400, "Something went wrong!!!"));
            });

            cb(generic.jsonRes(200, "Fund Transfer Successfully!!!", {
                referenceNumber: refNumber,
            }));
        });
    }

};
