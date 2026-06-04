
import * as classElements from './classElements/classElements.js'

import { testRecords } from './testRecords/testRecords.js'

export const htmlHelpers = {

    classElements: classElements,
    testRecords: testRecords,
    formatRecord: formatRecord

}


function formatRecord(value, baseUrl){

    if(Array.isArray(value)){
        return value.map(x => formatRecord(x, baseUrl))
    }

    if(value?.['@type'] || valeu?.['@id']){

        let url = new URL(encodeURIComponent("/" + value?.['@idb'] || ""), baseUrl)

        value['@id'] = `<a href="${url}">${value?.['@id'] || "na"}</a>`

        for(let k of Object.keys(value)){
            value[k] = formatRecord(value[k], baseUrl)
        }

        return value
    }

    return value

}


export default { htmlHelpers }