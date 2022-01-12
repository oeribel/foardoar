const dbservice = require(__dirname + '/dataservice.js');

function createResponse(res) {
    return function (err, results) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": results
        })
    };
}
getGroups = function(res) {
    const sql = "select * from groups order by parentgroup, ordering"
    const params = []
    dbservice.query(sql, params, createResponse(res));
}

getGroupsById = function(groupId, res) {
    const sql = "select * from groups where id = " + groupId;
    const params = []
    dbservice.query(sql, params, createResponse(res));
}

getSubGroupsById = function(groupId, res) {
    const sql = "select * from groups where parentgroup = " + groupId + " order by parentgroup, ordering";
    const params = []
    dbservice.query(sql, params, createResponse(res));
}

createGroup = function(data, res) {
    let errors=[]
    if (data.id){
        errors.push("Cannot create with id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql ='INSERT INTO groups (name, ordering, parentgroup, icon) VALUES (?,?,?,?)'
    const params =[data.name, !data.ordering ? 99 : data.ordering , !data.parentgroup ? 0 : data.parentgroup, data.icon]
    dbservice.createQuery(sql, params, res, data);
}

updateGroup = function(data, res) {
    let errors=[]
    if (!data.id){
        errors.push("Cannot update without id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql =`UPDATE groups set
        name = COALESCE(?,name),
        ordering = COALESCE(?,ordering),
        parentgroup = COALESCE(?,parentgroup),
        icon = COALESCE(?,icon) 
        WHERE id = ?`
    const params =[data.name, data.ordering , data.parentgroup, data.icon, data.id]
    dbservice.updateQuery(sql, params, res, data);
}

deleteGroup = function(groupId, res) {
    const sql = "delete from groups where id = " + groupId;
    dbservice.deleteQuery(sql, res);
}