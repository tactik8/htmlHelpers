import { testRecords} from '../testRecords.js'

export function getProduct(name=0) {


    let record_type = "Product"
    if (!Number.isNaN(name)) {
        name = record_type + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name
    }

   

    return record


}