


export const  htmlFormatHelpers  = {

    value: formatValue,
    heading: getHeading,
    text: getText,
    record: formatRecord
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



function formatValue(value, options){
    /**
     * TODO: implement this
     */
    

    if(Array.isArray(value)){
        return `List (${value.length})`
    }

    if(typeof value === 'object'){

        if('@type' in value){
            return formatValueAsThing(value, options)
        }
        return JSON.stringify(value)
    }

    if(typeof value === 'string'){
        if(value.startsWith('http')){
            return formatValueAsUrl(value, options)
        }
        if(value.includes('@')){
            return formatValueAsEmail(value, options)
        }
        return value
    }
    return value
}



function formatValueAsUrl(value, options){
    /**
     * TODO: implement this
     */
    return "<a href='" + value + "'>" + value +"</a>" 
    
}

function formatValueAsEmail(value, options){
    /**
     * TODO: implement this
     */
    return "<a href='mailto:" + value + "'>" + value + "</a>"

}

function formatValueAsThing(value, options){
    /**
     * TODO: implement this
     */
    let url = '/' + value['@type'] + '/' + value['@id']
    let name = value?.name || value?.url || value?.['@id']
    let content = "<a href='" + url + "'>" + name +"</a>"
    return content
}


function getHeading(record, options){
    /**
     * TODO: implement this
     */
    if(record?.['@type'] === 'Person'){
        return [record['givenName'], record['familyName']].join(' ') || record?.name ||  record?.email || record?.['@id']
    }

    if(record?.['@type'] === 'Organization'){
        let domain = record?.['url']
        try {
            domain = (new URL(record?.url || "")).hostname
        } catch (error){}
        
        return record?.name || domain || record?.['@id']
    }
    
    return record?.name || record?.headline || record?.name || record?.url || record?.['@id']

}


function getText(record, options){
    /**
     * TODO: implement this
     */
    if(record?.['@type'] === 'Person'){
        return record?.position
    }

    if(record?.['@type'] === 'Organization'){
        return record?.description
    }

    return record?.text || record?.description 

}
