/**
 * Uses handlebars for templating
 * https://handlebarsjs.com/guide/#what-is-handlebars
 */

import * as helpers from 'jsonld_helpers'

import { htmlFormatHelpers } from "../htmlFormatHelpers.js";

// import Handlebars from "handlebars";

let Handlebars

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';



import { readFile } from 'node:fs/promises';


// Get the directory name of the current module
export function getDirname(importMetaUrl) {
  // 1. Check if __dirname exists (CommonJS environment)
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  
  // 2. Fall back to import.meta.url (ESM environment)
  if (importMetaUrl) {
    return dirname(fileURLToPath(importMetaUrl));
  }

  // 3. Fallback to process.cwd() if no context is provided
  return process.cwd();
}

const currentDirectory = getDirname(import.meta.url);




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


async function getComponents() {

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
        "header",
        "footer",
        "image",
        "imageModal",
        "imageThumbnail",
        "listgroup",
        "menu",
        "modal",
        "pagination",
        "record",
        "starRating",
        "table",
        "table2",
        "testpartial"
    ];

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

        let relDirectory = join(currentDirectory, '../')

        let templateFilePath = join(relDirectory, 'templates', `${templateID}.html`);

        const data = await readFile(templateFilePath, 'utf8');

        content = data

    }

    let template = Handlebars.compile(content, { noEscape: true });
    cache[templateID] = template;
    return template;
}

async function init() {
    /**
     * precompiles templates and partials
     */

    if (!Handlebars) {
        const hModule = await import("handlebars");
        Handlebars = hModule.default || hModule;
    }


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

    Handlebars.registerHelper("setVar", function (varName, varValue, options) {
        options.data.root[varName] = varValue;
    });


    Handlebars.registerHelper("isdefined", function (value) {
        return value !== undefined;
    });
    Handlebars.registerHelper("eq", function (value1, value2) {
        return value1 == value2
    });

    Handlebars.registerHelper("lt", function (value1, value2) {
        return Number(value1) < Number(value2)
    });

    Handlebars.registerHelper("gt", function (value1, value2) {
        return Number(value1) > Number(value2)
    });

    Handlebars.registerHelper("le", function (value1, value2) {
        return Number(value1) < + Number(value2)
    });

    Handlebars.registerHelper("ge", function (value1, value2) {
        return Number(value1) >= Number(value2)
    });

    Handlebars.registerHelper('round', function (value) {
        return Math.round(Number(value))
    });

    Handlebars.registerHelper('floor', function (value) {
        return Math.floor(Number(value))
    });


    Handlebars.registerHelper("record_type", function (value) {

        return new Handlebars.SafeString(value?.['@type'] || "");
    });

    Handlebars.registerHelper("toValue", function (value) {
        let content = htmlFormatHelpers.value(value);
        content = content === undefined ? "" : content
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

    Handlebars.registerHelper("sequence", function (start, end, offset) {
        offset = offset || 1
        return Array.from({ length: (end - start + 1) / offset }, (_, i) => start + (i * offset));
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
    Handlebars.registerHelper('toJSON', function (obj) {
        return JSON.stringify(obj, null, 4);
    });

    Handlebars.registerHelper('add', function (v1, v2) {
        return Number(v1) + Number(v2);
    });

    Handlebars.registerHelper('subtract', function (v1, v2) {
        return Number(v1) - Number(v2);
    });

    Handlebars.registerHelper('multiply', function (v1, v2) {
        return Number(v1) * Number(v2);
    });

    Handlebars.registerHelper('divide', function (v1, v2) {
        return Number(v1) / Number(v2);
    });


    Handlebars.registerHelper('dotget', function (record, propertyID) {
        return helpers.getValue(record, propertyID)
    });

    Handlebars.registerHelper('getValue', function (record, propertyID) {
        return helpers.getValue(record, propertyID)
    });

    Handlebars.registerHelper('getValues', function (record, propertyID) {
        return helpers.getValues(record, propertyID)
    });

    Handlebars.registerHelper('increment', function (value, defaultValue) {
        if (!value) {
            value = defaultValue
        }
        value = Number(value)
        return value + 1
    });
    Handlebars.registerHelper('default', function (value, defaultValue) {
        return value || defaultValue
    });

    Handlebars.registerHelper('textToHTML', function (value) {

        let values = value.split('\n')
        let content = ''
        for (let v of values) {
            content += `<p>${v}</p>`
        }
        return new Handlebars.SafeString(content);


    });



    Handlebars.registerHelper('getStars', function (value, bestRating) {
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

    let content = template(data, { data: options });

    return content;
}
