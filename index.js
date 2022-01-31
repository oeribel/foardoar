'use strict';
const express = require('express');
require( __dirname + '/lib/groupservice.js');
require( __dirname + '/lib/pageservice.js');
require( __dirname + '/lib/settingservice.js');
const path = require('path');
const cors = require('cors');
const _ = require("lodash");
const app = express(),
    bodyParser = require("body-parser"),
    port = 3080;

const users = [];

app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'data/images')));
app.use(express.static(process.cwd()+"/foardoar/dist/foardoar/"));

Array.prototype.sortBy = function(p) {
    return this.slice(0).sort(function(a,b) {
        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
    });
}

// GROUPS

app.get("/api/groups", (req, res, next) => {
    getGroups(res);
});

app.get('/api/groups/subgroups/:groupId', (req, res) => {
    const groupId = parseInt(req.params.groupId);
    getSubGroupsById(groupId, res);
});

app.get('/api/groups/:groupId', (req, res) => {
    const groupId = parseInt(req.params.groupId);
    getGroupsById(groupId, res);
});

app.post('/api/groups', (req, res) => {
   createGroup(req.body, res);
});

app.put('/api/groups', (req, res) => {
    updateGroup(req.body, res);
});

app.delete('/api/groups/:groupId', (req, res) => {
    const groupId = parseInt(req.params.groupId);
    deleteGroup(groupId, res);
});

// PAGES
app.get('/api/pages/:groupId', (req, res) => {
    const groupId = parseInt(req.params.groupId);
    getPagesByGroupId(groupId, res);
});

app.get('/api/favorites', (req, res) => {
    getPagesByFavorite(res);
});

app.get('/api/overig', (req, res) => {
    getPagesByOverig(res);
});

app.get('/api/pages', (req, res) => {
    getPages(res);
});

app.post('/api/pages', (req, res) => {
    console.log('page opslaan')
    createPage(req.body, res);
});

app.put('/api/pages', (req, res) => {
    updatePage(req.body, res);
});

app.delete('/api/pages/:id', (req, res) => {
    const pageId = parseInt(req.params.id);
    deletePage(pageId, res);
});

app.get('/api/screenshot/:pageId', (req, res) => {
    const pageId = req.params.pageId;
    createScreenshotForPage(pageId);
});

app.get('/api/page/:id/screenshot', (req, res) => {
    const pageId = parseInt(req.params.id);
    getScreenshotForPage(pageId, res);
});

// SETTINGS
app.get('/api/settings', (req, res) => {
    getSettings(res);
});

app.post('/api/settings', (req, res) => {
    createSetting(req.body, res);
});

app.put('/api/settings', (req, res) => {
    updateSetting(req.body, res);
});

// OTHER
app.get('/api/ip', (req, res) => {
    require('dns').lookup(require('os').hostname(), function (err, add, fam) {
        res.send({
            'ipaddress' : add
        });
    })
});

app.get('/api/ping/:url', (req, res) => {
    const ping = require("ping");
    const host = req.params.url;
    console.log('ping ' + host);
    ping.sys.probe(host, function(isAlive){
        const msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
        console.log(msg);
        res.send({
                    'status' : isAlive
                });
    });
});

app.get('/*', (req,res) => {
    res.sendFile(process.cwd()+"/foardoar/src/index.html")
    // res.sendFile(process.cwd()+"/foardoar/dist/foardoar/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});