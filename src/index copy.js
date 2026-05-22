

import * as htmlTemplates from './htmlTemplates/htmlTemplates.js'
import * as classElements from './classElements/classElements.js'


import { Webpage } from './classWebpage.js.bak'
import { Website } from './classWebsite.js'

import { testRecords } from './testRecords/testRecords.js'


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
    let record = {
        "@type": "CreativeWork",
        "@id": "299f9af2-8a9b-4792-a98b-066205e1ab7a",
        "headline": "Headline 1",
        "text": "text 1",
        "hasPart": [
            {
                "@type": "CreativeWork",
                "@id": "9fe74187-558e-41bc-a97b-f49873da93b7",
                "headline": "Sub headline 1",
                "text": "text 1-1",
                "url": "https://www.google.com"
            },
            {
                "@type": "CreativeWork",
                "@id": "29f43152-29af-4c83-a9e5-d0a07b68f92d",
                "headline": "Sub headline 2",
                "text": "text 1-2",
                "url": "https://www.google.com"
            }
        ]
    }



    // Init website
    let website = new Website()
    website.name = 'Kick ass name'
    website.htmlHeaderTemplate = 'basicTemplate/blocks/header'
    website.htmlFooterTemplate = 'basicTemplate/blocks/footer'
    website.addHeaderLink('Home', '/')
    website.addHeaderLink('Link1', '/link1')
    website.addHeaderLink('Link2', '/link2')
    website.addFooterLink('Home', '/')
    website.addFooterLink('Link1', '/link1')
    website.addFooterLink('Link2', '/link2')
    await website.initHtml()




    // Init webpage
    let webpage = new Webpage(website)
    webpage.name = 'Kick ass name'
    webpage.htmlPageTemplate = 'basicTemplate/components/page'

    let t1 = testRecords.article(0, 3)

    // 

    let t2 = [t1, t1, t1, t1, t1]




    let w2 = new classElements.WebSite()
    w2.name = "Kick ass site"
    w2.url = "https://www.test.com"

    w2.addHeaderLink('link1', '/link1')
    w2.addHeaderLink('link2', '/link2')
    w2.addHeaderLink('link3', '/link3')


    let wp = w2.webpage('/')

    let s = wp.section()

  

    s.add(new classElements.H1("Some headings1 text"))
    s.add(new classElements.p("Some ordinary text"))


    let html = await wp.get()

    console.log('cc', JSON.stringify(w2.record, null, 4))


    return html



}

