


export const  htmlFormatHelpers  = {

    value: formatValue,
    heading: getHeading,
    text: getText,
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
