

import * as htmlTemplates from './htmlTemplates/htmlTemplates.js'

import { Webpage } from './classWebpage.js'
import { Website } from './classWebsite.js'

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
    webpage.htmlPageTemplate = 'basicTemplate/blocks/page'



    let t1 = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "@id": "thing1",
        "name": "thing1",
        "headline": "Headline 1",
        "abstract": "abstract 1",
        "text": "text line 1\ntext line 2",
        "rating": {
            "@type": "Rating",
            "ratingValue": 3.5,
            "bestRating": 5
        },
        "author": {
            "@type": "Person",
            "@id": "author1",
            "name": "author1",
            "givenName": "author1gn",
            "familyName": "author1fm",
            "image": "https://placehold.co/600x400"
        },
        "datePublished": "2023-01-01T00:00:00Z",
        "hasPart": [{
            "@type": "CreativeWork",
            "@id": "299f9af2-8a9b-4792-a98b-066205e1ab7a",
            "headline": "Headline 2",
            "text": "text 1",
            "hasPart": [
                {
                    "@type": "CreativeWork",
                    "@id": "9fe74187-558e-41bc-a97b-f49873da93b7",
                    "headline": "Sub headline 3-1",
                    "text": "text 1-1"
                },
                {
                    "@type": "CreativeWork",
                    "@id": "29f43152-29af-4c83-a9e5-d0a07b68f92d",
                    "headline": "Sub headline 3-2",
                    "text": ""
                }
            ]
        }],
        "address": [
            {
                "@type": "PostalAddress",
                "@id": "dd",
                "streetAddress": "7 S. Broadway",
                "addressLocality": "Denver",
                "addressRegion": "CO",
                "postalCode": "80209",
                "addressCountry": "US"
            },
            {
                "@type": "PostalAddress",
                "@id": "dd",
                "streetAddress": "7 S. Broadway",
                "addressLocality": "Denver",
                "addressRegion": "CO",
                "postalCode": "80209",
                "addressCountry": "US"
            }
        ],
        "image": [
            {
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                "@id": "image1",
                "name": "image_1",
                "contentUrl": "https://placehold.co/600x400"
            },
            {
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                "@id": "image1",
                "name": "image_1",
                "contentUrl": "https://placehold.co/600x400"
            },
            {
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                "@id": "image1",
                "name": "image_1",
                "contentUrl": "https://placehold.co/600x401"
            },
            {
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                "@id": "image1",
                "name": "image_1",
                "contentUrl": "https://placehold.co/600x402"
            }
        ],
        "potentialActions": [
            {
                "@context": "https://schema.org/",
                "@type": "Thing",
                "@id": "potAction1",
                "name": "potAction1",
                "url": "#",
                "image": "https://placehold.co/600x400"
            },
            {
                "@context": "https://schema.org/",
                "@type": "Thing",
                "@id": "potAction2",
                "name": "potAction2",
                "url": "#",
                "image": "https://placehold.co/600x400"
            }

        ]
    }

    // 

    let t2 = [t1, t1, t1, t1, t1]

    //webpage.addPart(t1, 'basicTemplate/forms/address', record)
    //webpage.addPart(t1, 'basicTemplate/blocks/heroRight', record)


    //webpage.addPart(t1, 'basicTemplate/blocks/demoRecord')
    //webpage.addPart(t2, 'basicTemplate/blocks/demoRecords')
webpage.addPart(t1, 'basicTemplate/blocks/record')

    let html = await webpage.renderHtmlPage()


    return html



}

