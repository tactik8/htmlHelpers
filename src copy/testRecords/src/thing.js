import { testRecords} from '../testRecords.js'


export function getThing(name=0, depth = 0) {


    let record_type = "Thing"
     if (!Number.isNaN(name)) {
        name = record_type + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name,
        "hasPart": []
    }

    if (depth > 0) {

        for (let i = 0; i < 3; i++) {

            let newName = name + '_' + String(i)
            record.hasPart.push(getThing(newName, depth - 1))
        }
    }


    return record


}