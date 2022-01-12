const db = require("./database.js");

exports.updateQuery = function(sql, params, res, data) {
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
}

exports.createQuery = function(sql, params, res, data) {
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        let datastr = JSON.stringify(data);
        datastr = '{"id":' + this.lastID + ',' + datastr.slice(1);
        res.json({
            "message": "success",
            "data": JSON.parse(datastr)
        })
    });
}

exports.query = function(sql, params, cb) {
    db.all(sql, params, function (err, rows) {
        cb(err, rows);
    });
};

exports.deleteQuery = function(sql, res) {
    db.run(sql,
        function (err, result) {
            if (err) {
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message": "deleted", changes: this.changes});
        })
}