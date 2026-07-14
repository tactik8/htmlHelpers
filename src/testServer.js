
import helpers_jsonld from 'helpers_jsonld'

import { records } from 'helpers_jsonld'

import { helpers_html } from './index.js'


import express from 'express';
const app = express();


// Serve static files from the "public" directory
app.use(express.static('public'));

// Init 
let BASE_URL = "https://code.tactik8.com/proxy/3002/"

// Initialize database and website
let db
let website


function initWebsite() {
    website = new helpers_html.classElements.WebSite()
    website.baseUrl = BASE_URL
    website.name = "Kick ass site"
    //website.url = "https://code.tactik8.com"
    website.addHeaderLink('link1', '/link1')
    website.addHeaderLink('link2', '/link2')
    website.addHeaderLink('link3', '/link3')
    website.addFooterLink('link1', '/link1')
    website.addFooterLink('link2', '/link2')
    website.addFooterLink('link3', '/link3')
    website.brand = {
        "@type": "BrandVisualIdentity",
        "validFrom": "2025-05-14",
        "validTo": "2026-05-14",
        "colorLight": "rgb(186, 16, 104)",
        "colorDark": "rgb(238, 246, 245)",
        "colorPrimary": "rgb(38, 219, 239)",
        "colorSecondary": "rgb(29, 97, 6)",
        "colorTertiary": "rgb(235, 94, 14)",
        "colorNeutral": "rgb(0, 0, 0)",
        "colorInfo": "rgb(229, 59, 195)",
        "colorSuccess": "rgb(74, 226, 89)",
        "colorWarning": "rgb(241, 224, 39)",
        "colorDanger": "rgb(169, 15, 15)",
        "typographyH1FontFamily": "'Playfair Display', serif",
        "typographyH1FontSize": "4.5rem",
        "typographyH2FontFamily": "'Playfair Display', serif",
        "typographyH2FontSize": "3.5rem",
        "typographyH3FontFamily": "'Playfair Display', serif",
        "typographyH3FontSize": "3rem",
        "typographyBodyFontFamily": "'Montserrat', sans-serif",
        "typographyBodyFontSize": "1.125rem",
        "baselineSpacingUnit": "4px",
        "baselineBorderRadius": "6px",
        "logoPathPrimary": "https://www.duchesnay.com/images/logo.svg",
        "faviconPath": "https://www.duchesnay.com/images/icons/favicon-32x32.png",
        "wcagContrastLevel": "AA"
    }
}


function initDb() {

    db = new helpers_jsonld.DB()

    // Populate records
    let t1 = helpers_jsonld.records.itemList(50)

    db.post(t1)

}




app.get('/', async (req, res, next) => {
    try {

        let webpage = website.webpage('/')
        webpage.name = "main"

        let r = {
            "@type": "SearchAction",
            "query": {
                "filter": {},
                "limit": 5,
                "offset": 10,
                "orderBy": "@id",
                "orderDirection": "-1"
            },
            "result": db.records
        }

        let html = await webpage.baseElement(r)

        res.send(html)

    } catch (err) {
        next(err); // Pass error to Express error handler
    }
});

app.get('/:record_id', async (req, res, next) => {
    try {

        let webpage = website.webpage('/')

        let s = webpage.section()

        let r = db.get(req.params.record_id)

        let html = await webpage.baseElement(r)

        res.send(html)

    } catch (err) {
        next(err); // Pass error to Express error handler
    }
});



initWebsite()
initDb()

app.listen(3002);






