

import { testRecords } from '../testRecords.js'




export function getArticle(name = 0, depth = 0, currentDepth = 0) {


    let record_type = "CreativeWork"

    if (typeof name != "string") {
        name = record_type + "_" + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name,
        "headline": "Headline " + name,
        "text": lorem(),
        "image": testRecords.image(),
        "hasPart": []
    }

    if (currentDepth == 0) {
        record.author = testRecords.person()
        record.datePublished = new Date().toISOString()
    }


    if (currentDepth < depth) {

        for (let i = 0; i < 3; i++) {

            let newName = name + '_' + String(i)
            record.hasPart.push(getArticle(newName, depth, currentDepth + 1))
        }
    }


    return record


}




function lorem() {

    return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

}