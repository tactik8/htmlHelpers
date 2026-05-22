
import helpers from 'jsonld_helpers' 

import { records} from 'jsonld_helpers'


import htmlHelpers from './dist/index.js'



import express from 'express';
const app = express();

app.get('/', async (req, res, next) => {
    try {
        let content = await test()
        res.send(content)
    } catch (err) {
        next(err); // Pass error to Express error handler
    }
});

app.listen(3002);






async function test() {
    

    let t1 = htmlHelpers.testRecords.article(0, 3)

    // 

    

    // Init website
    let website = new htmlHelpers.classElements.WebSite()
    website.baseUrl = "https://kickassurl.com/api"
    website.name = "Kick ass site"
    website.url = "https://www.test.com"
    website.addHeaderLink('link1', '/link1')
    website.addHeaderLink('link2', '/link2')
    website.addHeaderLink('link3', '/link3')
    website.addFooterLink('link1', '/link1')
    website.addFooterLink('link2', '/link2')
    website.addFooterLink('link3', '/link3')

    // init webpage 
    let webpage = website.webpage('/')
    webpage.name = "main"


    // init record
    let result = helpers.records.itemList(50)

    let r = {
        "@type": "SearchAction",
        "query": {
            "filter": {},
            "limit": 5,
            "offset": 10,
            "orderBy": "@id",
            "orderDirection": "-1"
        },
        "result": result
    }


    // add section
    let s = webpage.section()
    s.add(new htmlHelpers.classElements.Records(r))
  
    let html = await webpage.get()


    return html



}

