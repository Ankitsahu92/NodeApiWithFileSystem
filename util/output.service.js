class ThrowResponse{
    jsonRes(status,msg,data) {
        const jsonData = {
            "status": status ? status : 200,
            "msg": msg ? msg : "",
            "data": data ? data : {}
        }
        return jsonData;
    }
    nestedFormat(arrEle){
        let i, j;
        let chunk = 2;
        let temparray = [];
        for (i = 0, j = arrEle.length; i < j; i += chunk) {
            temparray.push(arrEle.slice(i, i + chunk));
        }
        console.log('what arrr', temparray);
        return temparray;
    }
}

const  ThrowResponseObj = new ThrowResponse();
module.exports = ThrowResponseObj;
