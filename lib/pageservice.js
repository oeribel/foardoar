const dbservice = require(__dirname + '/dataservice.js');
const foardoarutil = require(__dirname + '/foardoarutil.js');

getPages = function(res) {
    const sql = "select * from pages order by ordering";
    const params = [];
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}

createScreenshotForPage = function(id, res) {
    const sql = "select * from pages where id = " + id;
    const params = []
    dbservice.query(sql, params, function (err, results) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        const puppeteer = require("puppeteer");
        const capture = async () => {
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--use-gl=egl', '--no-sandbox'],
            });
            const page = await browser.newPage();
            await page.goto(results[0].theurl);
            await page.screenshot({path: "data/images/" + results[0].id + ".png"});
            await browser.close();
        };
        capture();
    });
    // const sql1 =`UPDATE pages set screenshot = null WHERE id = ?`
    // const params1 =[id]
    // dbservice.updateQuery(sql1, params1, res);
}

getScreenshotForPage = function(id, res) {
    const sql = "select * from pages where id = " + id;
    const params = []
    const fs = require('fs');
    dbservice.query(sql, params, function (err, results) {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (results[0].screenshot) {
            res.json({
                "message": "success",
                "data": "/images/" + results[0].screenshot
            })
        } else if (fs.existsSync('data/images/' + id + '.png')){
            res.json({
                "message": "success",
                "data": "/images/" + id + ".png"
            })
        } else {
            res.json({
                "message": "success",
                "data": "/images/unknown.png"
            })
        }
    });
}

getPagesByGroupId = function(groupId, res) {
    const sql = "select * from pages where parentgroup = " + groupId + " order by ordering";
    const params = []
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}

getPagesByFavorite = function(res) {
    const sql = "select p.*, g.ordering from pages p, groups g where p.parentgroup = g.id and p.favorite = 1 order by g.ordering,  p.ordering";
    const params = []
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}

getPagesByOverig = function(res) {
    const sql = "select p.* from pages p where p.parentgroup = 0";
    const params = []
    dbservice.query(sql, params, foardoarutil.createResponse(res));
}

createPage = function(data, res) {
    let errors=[]
    if (data.id){
        errors.push("Cannot create with id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (!data.theurl){
        errors.push("No theurl specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql ='INSERT INTO pages (name, theurl, screenshot, ordering, parentgroup, favorite) VALUES (?,?,?,?,?,?)'
    const params =[data.name, data.theurl, !data.screenshot ? null : data.screenshot, !data.ordering ? 99 : data.ordering, !data.parentgroup ? 0 : data.parentgroup, !data.favorite ? 0 : data.favorite]
    dbservice.createQuery(sql, params, res, data);
}

updatePage = function(data, res) {
    let errors=[]
    if (!data.id){
        errors.push("Cannot update without id");
    }
    if (!data.name){
        errors.push("No name specified");
    }
    if (!data.theurl){
        errors.push("No theurl specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    const sql =`UPDATE pages set
        name = COALESCE(?,name),
        theurl = COALESCE(?,theurl),
        screenshot = COALESCE(?,screenshot),
        ordering = COALESCE(?,ordering),
        parentgroup = COALESCE(?,parentgroup),
        favorite = COALESCE(?,favorite)
        WHERE id = ?`
    const params =[data.name, data.theurl, data.screenshot, data.ordering , data.parentgroup, data.favorite, data.id]
    dbservice.updateQuery(sql, params, res, data);
}

deletePage = function(id, res) {
    const sql = "delete from pages where id = " + id;
    dbservice.deleteQuery(sql, res);
}