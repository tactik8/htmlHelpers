import { testRecords} from '../testRecords.js'


export function getPerson(name=0) {


    let record_type = "Person"
     if (!Number.isNaN(name)) {
        name = record_type + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name,
        "givenName": "givenName_" + name,
        "familyName": "familyName_" + name,
        "email": name + "@testrecord.com",
        "address": testRecords.address()
    }

   

    return record


}