/**
 * Uses handlebars for templating
 * https://handlebarsjs.com/guide/#what-is-handlebars
 */

import { htmlFormatHelpers } from "../htmlFormatHelpers.js";

//import Handlebars from "https://esm.run/handlebars";
import Handlebars from "handlebars";

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { readFile } from 'node:fs/promises';


// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));


export const htmlTemplates = {
    render: renderHtml,
};


export default htmlTemplates



// ---------------------------------------------
// Set key variables
// ---------------------------------------------

let cache = {};
let isInitialized = false;

// ---------------------------------------------
// init
// ---------------------------------------------


async function getComponents(){

    let c = [
        "accordion",
        "address",
        "article",
        "articleBody",
        "articleToC",
        "card",
        "cardHorizontal",
        "carousel",
        "dropdown",
        "image",
        "imageModal",
        "imageThumbnail",
        "listgroup",
        "menu",
        "modal",
        "record",
        "starRating",
        "table",
        "testpartial"
    ];

    console.log('c', c)
    return c

    
}



async function getTemplate(templateID) {
    /**
     * @param {string} style
     * @returns {string}
     *
     */

    let content;

    

    if (1 == 1) {
        //let templateFilePath = join(__dirname, './htmlTemplates', `${templateID}.html`);
        let templateFilePath = join(__dirname,  `${templateID}.html`);

        //let templateFilePath = `./htmlTemplates/${templateID}.html`;

         const data = await readFile(templateFilePath, 'utf8');
    
        content = data


        // let req = await fetch(templateFilePath);
        // content = await req.text();
    }

    let template = Handlebars.compile(content, { noEscape: true });
    cache[templateID] = template;
    return template;
}

async function init() {
    /**
     * precompiles templates and partials
     */

    if (isInitialized === true) {
        return;
    }

    // Precompile and register components
    let components = await getComponents()
    

    for (let component of components) {
        let template = await getTemplate(
            "basicTemplate/components/" + component,
        );
        Handlebars.registerPartial(component, template);
    }


    // Precompile and register blocks
    let blocks = [
        
        "heroLeft",
    ];


    for (let block of blocks) {
        let template = await getTemplate(
            "basicTemplate/blocks/" + block,
        );
        Handlebars.registerPartial(block, template);
    }


    // Precompile and register icons
    let icons = [
        "star",
        "starEmpty",
        "starFull",
        "starHalf"
    ];


    for (let icon of icons) {
        let template = await getTemplate(
            "basicTemplate/icons/" + icon,
        );
        Handlebars.registerPartial(icon, template);
    }


    
    // register helpers
    Handlebars.registerHelper("isdefined", function (value) {
        return value !== undefined;
    });
    Handlebars.registerHelper("eq", function (value1, value2) {
        console.log(value1, value2)
        return value1 === value2
    });


    Handlebars.registerHelper("toValue", function (value) {
        let content = htmlFormatHelpers.value(value);
        return new Handlebars.SafeString(content);
    });

    Handlebars.registerHelper("isObject", function (value) {
        return value?.["@type"] !== undefined;
    });

    Handlebars.registerHelper("isArray", function (value) {
        return Array.isArray(value);
    });

    Handlebars.registerHelper("toArray", function (value) {
        value = Array.isArray(value) ? value : [value];
        return value;
    });

    Handlebars.registerHelper("first", function (value) {
        value = Array.isArray(value) ? value : [value];
        return [value?.[0]];
    });

    Handlebars.registerHelper("getHeading", function (value) {
        return htmlFormatHelpers.heading(value);
    });

    Handlebars.registerHelper("getText", function (value) {
        return htmlFormatHelpers.text(value);
    });
    Handlebars.registerHelper('toJSON', function(obj) {
        return JSON.stringify(obj, null, 4);
    });
    Handlebars.registerHelper('increment', function(value, defaultValue) {
        if(!value){
            value = defaultValue
        }
        value = Number(value)
        return value + 1
    });
    Handlebars.registerHelper('default', function(value, defaultValue) {
        return value || defaultValue
    });

    Handlebars.registerHelper('textToHTML', function(value) {

        let values = value.split('\n')
        let content = ''
        for (let v of values){
            content += `<p>${v}</p>`
        }
        return new Handlebars.SafeString(content);

        
    });

    

    Handlebars.registerHelper('getStars', function(value, bestRating) {
        value = Number(value) || 0
        bestRating = Number(bestRating) || 5
        let fullStarsNo = Math.floor(value);
        let halfStarsNo = Math.ceil(value - fullStarsNo);
        let emptyStarsNo = (bestRating) - fullStarsNo - halfStarsNo;

        
        let stars = []
        for (let i = 0; i < fullStarsNo; i++) {
            stars.push("starFull")
        }
        for (let i = 0; i < halfStarsNo; i++) {
            stars.push("starHalf")
        }
        for (let i = 0; i < emptyStarsNo; i++) {
            stars.push("starEmpty")
        }
        console.log('s', stars)
        return stars
    });

    isInitialized = true;
}

async function renderHtml(templateID, data, options) {
    /**
     * @param {string} style
     */


    await init();

    // Retrieve template from cache
    let template = cache?.[templateID];

    // If not in cache, load it
    if (template === undefined) {
        template = await getTemplate(templateID);
    }

    let content =  template(data);

    return content;
}
