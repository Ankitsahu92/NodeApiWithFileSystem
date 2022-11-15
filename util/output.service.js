class ThrowResponse {
    jsonRes(status, msg, data, errors = null) {
        const jsonData = {
            "status": status ? status : 200,
            "msg": msg ? msg : "",
            "errors": errors ? errors : [],
            "data": data ? data : {}
        }
        return jsonData;
    }
    nestedFormat(arrEle) {
        let i, j;
        let chunk = 2;
        let temparray = [];
        for (i = 0, j = arrEle.length; i < j; i += chunk) {
            temparray.push(arrEle.slice(i, i + chunk));
        }
        return temparray;
    }
}

const ThrowResponseObj = new ThrowResponse();
module.exports = ThrowResponseObj;
