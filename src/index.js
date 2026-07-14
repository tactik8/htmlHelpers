
import * as classElements from './classElements/classElements.js'

import { testRecords } from './testRecords/testRecords.js'

export const helpers_html = {

    classElements: classElements,
    testRecords: testRecords,
    formatRecord: formatRecord

}

/**
 * Format record for html display. This function will format the record to include links for @id and @type fields, and recursively format nested objects and arrays.
 * @param {Object|Array} value - The record or array of records to format.
 * @param {string} baseUrl - The base URL to use for generating links.
 * @returns {Object|Array} - The formatted record or array of records.
 */
function formatRecord(value, baseUrl){

    if(Array.isArray(value)){
        return value.map(x => formatRecord(x, baseUrl))
    }

    if(value?.['@type'] || value?.['@id']){

        let linkID = encodeURIComponent(value?.['@id'] || "")

        baseUrl = baseUrl || ""

        if(baseUrl.endsWith('/') == false){
            baseUrl = baseUrl + '/'
        }

        value['@id'] = `<a href="${baseUrl}${linkID}">${value?.['@id'] || "na"}</a>`

        for(let k of Object.keys(value)){
            if(k == "@id"){ continue}
            value[k] = formatRecord(value[k], baseUrl)
        }

        return value
    }

    return value

}


export default { helpers_html }