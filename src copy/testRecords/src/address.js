import { testRecords} from '../testRecords.js'


export function getAddress(name=0) {


    let record_type = "Thing"
    if (!Number.isNaN(name)) {
        name = record_type + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name,
        "streetAddress": "123 Street",
        "addressLocality": "Some city",
        "addressRegion": "Some province",
        "postalCode": "H0H 0H0",
        "addressCountry": "CA"
    }

    

    return record


}