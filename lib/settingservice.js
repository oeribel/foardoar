const dbservice = require(__dirname + '/dataservice.js');
const foardoarutil = require(__dirname + '/foardoarutil.js');

getSettings = function(res) {
    const sql = "select * from settings";
    const params = [];
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}