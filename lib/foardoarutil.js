
exports.createResponse = function (res) {
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