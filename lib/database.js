var sqlite3 = require('sqlite3')
// var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "data/foardoar.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`create table groups(
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       name text not null,
                                       ordering int not null,
                                       parentgroup int not null,
                                       icon text
                )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO groups (name, ordering, parentgroup, icon) VALUES (?,?,?,?)'
                    db.run(insert, ['Default1', 1,  0,'bi bi-columns-gap'])
                    db.run(insert, ['3D', 5,  0,'bi bi-box'])
                    db.run(insert, ['Werk', 6,  0,'bi bi-briefcase-fill'])
                    db.run(insert, ['Online', 2,  0,'bi bi-twitter'])
                    db.run(insert, ['Movies', 7,  0,'bi bi-film'])
                    db.run(insert, ['Diverse', 3,  0,'bi bi-ui-checks-grid'])
                    db.run(insert, ['Thuis', 3,  0,'bi bi-house-fill'])
                    db.run(insert, ['Linux nieuws', 0,  1,'fa fas-box'])
                    db.run(insert, ['Anderen', 0,  4,'fa fas-box'])
                    db.run(insert, ['Models', 1,  2,'fa fas-box'])
                    db.run(insert, ['HDRI', 2,  2,'fa fas-box'])
                    db.run(insert, ['Brokers', 0,  3,'fa fas-box'])
                    db.run(insert, ['Home automation', 0,  7,'fa fas-box'])
                    db.run(insert, ['Textures', 3,  2,'fa fas-box'])
                }
            });
        db.run(`create table settings(
                                       id INTEGER PRIMARY KEY AUTOINCREMENT,
                                       name text not null,
                                       description text not null,
                                       value text
                )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO settings (name, description, value) VALUES (?,?,?)'
                    db.run(insert, ['thumbnailsize', 'De grootte van de thumbnails op de pagina', '250'])
                }
            });
        db.run(`create table pages(
                                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                                      name text not null,
                                      theurl text not null,
                                      screenshot text,
                                      ordering int not null,
                                      parentgroup int not null,
                                      favorite int NOT NULL CHECK (favorite IN (0, 1))
                )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO pages (name, theurl, screenshot, ordering, parentgroup, favorite) VALUES (?,?,?,?,?,?)'
                    db.run(insert, ['Oeribel', 'https://oeribel.nl',  null, 0, 4,  0])
                    db.run(insert, ['Nu.nl', 'https://nu.nl',  null, 0, 1,  0])
                        db.run(insert, ['Bootstrap icons', 'https://icons.getbootstrap.com',  null, 0, 3,  0])
                        db.run(insert, ['Tweakers', 'http://tweakers.net/',  null, 0, 1,  0])
                        db.run(insert, ['Omrop Fryslan', 'http://omropfryslan.nl/',  null, 0, 1,  0])
                        db.run(insert, ['Gmail', 'http://gmail.com/',  null, 0, 1,  0])
                        db.run(insert, ['Whatsapp', 'http://web.whatsapp.com/',  null, 0, 1,  0])
                        db.run(insert, ['Google Maps', 'http://maps.google.com/',  null, 0, 1,  0])
                        db.run(insert, ['Buienradar', 'http://buienradar.nl/',  null, 0, 1,  0])
                        db.run(insert, ['cgtrader', 'https://www.cgtrader.com/free-3d-models',  null, 0, 11,  0])
                        db.run(insert, ['turbosquid', 'https://www.turbosquid.com/Search/3D-Models/free',  null, 0, 11,  0])
                        db.run(insert, ['sketchfab', 'https://sketchfab.com/features/download',  null, 0, 11,  0])
                        db.run(insert, ['clara', 'https://clara.io/',  null, 0, 11,  0])
                        db.run(insert, ['grabcad', 'https://grabcad.com/library',  null, 0, 11,  0])
                        db.run(insert, ['archive3d', 'https://archive3d.net/',  null, 0, 11,  0])
                        db.run(insert, ['hdrihaven', 'https://hdrihaven.com/',  null, 0, 12,  0])
                        db.run(insert, ['myfreetextures', 'https://www.myfreetextures.com/',  null, 0, 13,  0])
                        db.run(insert, ['texturex', 'https://www.texturex.com/',  null, 0, 13,  0])
                        db.run(insert, ['freestocktextures', 'https://freestocktextures.com/texture/',  null, 0, 13,  0])
                        db.run(insert, ['texturehaven', 'https://www.texturehaven.com/textures/?c=floor&s=floor',  null, 0, 13,  0])
                        db.run(insert, ['poliigon', 'https://www.poliigon.com/textures/?refine_by=assets-free&page=2',  null, 0, 13,  0])
                        db.run(insert, ['itsfoss', 'https://itsfoss.com/',  null, 0, 9,  0])
                        db.run(insert, ['9to5linux', 'https://9to5linux.com/',  null, 0, 9,  0])
                        db.run(insert, ['omgubuntu', 'https://www.omgubuntu.co.uk/',  null, 0, 9,  0])
                        db.run(insert, ['phoronix', 'https://www.phoronix.com/scan.php?page=home',  null, 0, 9,  0])
                        db.run(insert, ['TP link', 'http://192.168.0.1/',  null, 0, 8,  0])
                        db.run(insert, ['Synology', 'http://192.168.0.42:5000/',  null, 0, 8,  0])
                        db.run(insert, ['Phoscon', 'http://192.168.0.42:8082/',  null, 0, 8,  0])
                        db.run(insert, ['Pi-Hole', 'http://192.168.0.42:8086/admin/',  null, 0, 8,  0])
                        db.run(insert, ['Synology Photo', 'http://192.168.0.42/photo/#!Albums',  null, 0, 8,  0])
                        db.run(insert, ['Synology Audio', 'https://192.168.0.42:5001/audio/',  null, 0, 8,  0])
                        db.run(insert, ['ubooquity', 'https://boeken.edsel.nl/ubooquity',  null, 0, 8,  0])
                        db.run(insert, ['Influx', 'http://192.168.0.42:8124/',  null, 0, 8,  0])
                        db.run(insert, ['Grafana', 'http://192.168.0.42:8125/',  null, 0, 8,  0])
                        db.run(insert, ['SurveillanceStation', 'https://192.168.0.42:5001/webman/3rdparty/SurveillanceStation/',  null, 0, 8,  0])
                        db.run(insert, ['Plesk', 'https://edsel.nl:8443/',  null, 0, 4,  0])
                        db.run(insert, ['oeribel.nl/wp-admin', 'https://oeribel.nl/wp-admin/',  null, 0, 4,  0])
                        db.run(insert, ['TST wpadmin', 'https://timmersealertechnology.com/web/wp-admin',  null, 0, 4,  0])
                        db.run(insert, ['TST', 'https://timmersealertechnology.com/web/',  null, 0, 4,  0])
                        db.run(insert, ['Ferens local', 'http://192.168.0.42:5000/',  null, 0, 4,  0])
                        db.run(insert, ['Mail winston', 'http://mail.winston.foundation/SOGo/',  null, 0, 4,  0])
                        db.run(insert, ['Winston', 'http://winston.foundation/',  null, 0, 4,  0])
                        db.run(insert, ['Freelance', 'https://www.freelance.nl/acquisitie/mijn-matches',  null, 0, 14,  0])
                        db.run(insert, ['fixedtoday', 'https://www.fixedtoday.nl/aanvragen/',  null, 0, 14,  0])
                        db.run(insert, ['quades', 'https://www.quades.com/nl/',  null, 0, 14,  0])
                        db.run(insert, ['sevenstars', 'http://sevenstars.nl/',  null, 0, 14,  0])
                        db.run(insert, ['locuspeople', 'https://locuspeople.nl/voor-professionals/ik-ben-professional/',  null, 0, 14,  0])
                        db.run(insert, ['spilberg', 'http://spilberg.nl/',  null, 0, 14,  0])
                        db.run(insert, ['destaffinggroep', 'https://www.destaffinggroep.nl/opdrachten/',  null, 0, 14,  0])
                        db.run(insert, ['caesarsharedflex', 'https://caesarsharedflex.nl/bij-ons-werken/alle-aanvragen',  null, 0, 14,  0])
                        db.run(insert, ['yacht', 'https://www.yacht.nl/vacatures?zoekterm=java&afstand=50',  null, 0, 14,  0])
                        db.run(insert, ['linkit', 'https://www.linkit.nl/vacancies?VacancyType=%5B%22Interim%20opdracht%22%5D',  null, 0, 14,  0])
                        db.run(insert, ['amazon', 'https://www.amazon.com/gp/video/search/ref=atv_hm_hom_3_c_0z7q22_2_smr?queryToken=eyJ0eXBlIjoicXVlcnkiLCJuYXYiOnRydWUsInBpIjoiZGVmYXVsdCIsInNlYyI6ImNlbnRlciIsInN0eXBlIjoic2VhcmNoIiwicXJ5Ijoibm9kZT0xNDA5NTcyMzAxMSZmaWVsZC13YXlzX3RvX3dhdGNoPTEyMDA3ODY1MDExJmFkdWx0LXByb2R1Y3Q9MCZzZWFyY2gtYWxpYXM9aW5zdGFudC12aWRlbyZxcy1hdl9yZXF1ZXN0X3R5cGU9NCZxcy1pcy1wcmltZS1jdXN0b21lcj0yIiwicnQiOiIwejdRMjJzbXIiLCJ0eHQiOiJXYXRjaCB3aGlsZSBhYnJvYWQiLCJzdWJ0eHQiOiJJbmNsdWRlZCB3aXRoIFByaW1lIiwib2Zmc2V0IjowLCJucHNpIjowLCJvcmVxIjoiOTM2YjBiODktMWFlYS00OTI5LWE2ODYtODhkOTE2ODRlMGFmOjE1OTI2ODEzNjgwMDAiLCJzdHJpZCI6IjE6MTEzNzEyNkc4SFFGS0wjI01aUVdHWkxVTVZTRUdZTFNONTJYR1pMTSIsIm9yaWdpbmFsUmVxdWVzdENhY2hlS2V5IjoiTGk2K28vZ3NoMGhHQ2NUZ2FUZ0tMem1iQXp0em5nb3NvZUkwNnphaGZkST0iLCJvcmlnaW5hbFJlcXVlc3RDYWNoZUtleVZlcnNpb24iOjF9&pageId=default&queryPageType=browse&ie=UTF8#nav-top',  null, 0, 6,  0])
                        db.run(insert, ['ziggogo', 'https://www.ziggogo.tv/nl.html',  null, 0, 6,  0])
                        db.run(insert, ['disneyplus', 'https://www.disneyplus.com/home',  null, 0, 6,  0])
                        db.run(insert, ['imdb', 'https://www.imdb.com/',  null, 0, 6,  0])
                        db.run(insert, ['Synology video', 'https://192.168.0.42/video/',  null, 0, 6,  0])
                        db.run(insert, ['Kodi', 'http://192.168.0.112:8080/',  null, 0, 6,  0])
                        db.run(insert, ['brightprd', 'https://brightprd.b2clogin.com/brightprd.onmicrosoft.com/b2c_1_bright_sign_in_prod/oauth2/v2.0/authorize?response_type=id_token&scope=openid%20profile&client_id=1197f985-7d58-4409-87ce-71e6c3fcaf21&redirect_uri=https%3A%2F%2Fmijn.brightpensioen.nl&state=eyJpZCI6IjUwYmRiNjZlLTUzNjctNDFjMi1iOGFlLTc1Y2NkYjFjNTI1NCIsInRzIjoxNjM0NzMxNDMwLCJtZXRob2QiOiJyZWRpcmVjdEludGVyYWN0aW9uIn0%3D&nonce=dccacfac-607a-449c-9ad9-d3c28f261919&client_info=1&x-client-SKU=MSAL.JS&x-client-Ver=1.4.9&client-request-id=3c088ac2-1d6d-4425-be94-c4cb1438a5b3&response_mode=fragment',  null, 0, 3,  0])
                        db.run(insert, ['Home Assistant', 'http://192.168.0.42:8123/lovelace/default_view',  null, 0, "8",  0])
                        db.run(insert, ['Docker Registry Local', 'http://192.168.0.42:5004',  null, 0, "8",  0])
                        db.run(insert, ['Edsel1', 'https://edsel.nl',  null, 0, 4,  0])
                        db.run(insert, ['Rtl Nieuws', 'http://rtlnieuws.nl/',  null, 0, 1, 0])
                }
            });
    }
});


module.exports = db
