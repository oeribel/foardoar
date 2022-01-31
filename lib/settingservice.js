const dbservice = require(__dirname + '/dataservice.js');
const foardoarutil = require(__dirname + '/foardoarutil.js');

getSettings = function(res) {
    const sql = "select * from settings";
    const params = [];
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}

createSetting = function(data, res) {
    let errors=[]
    if (data.id){
        errors.push("Cannot create with id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (!data.value){
        errors.push("No value specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql ='INSERT INTO settings (name, description, value) VALUES (?,?,?)'
    const params =[data.name, !data.description ? null : data.description, data.value]
    dbservice.createQuery(sql, params, res, data);
}

updateSetting = function(data, res) {
    let errors=[]
    if (!data.id){
        errors.push("Cannot update without id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (!data.value){
        errors.push("No value specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql =`UPDATE settings set
        name = COALESCE(?,name),
        description = COALESCE(?,description),
        value = COALESCE(?,value)
        WHERE id = ?`
    const params =[data.name, data.description, data.value, data.id]
    dbservice.updateQuery(sql, params, res, data);
}