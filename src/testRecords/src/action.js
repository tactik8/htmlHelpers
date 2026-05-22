
import { testRecords} from '../testRecords.js'


export function getAction(name=0, depth = 0) {


    let record_type = "Action"
    if (!Number.isNaN(name)) {
        name = record_type + String(name)
    }

    let record_id = "https://www.testrecord.com/" + name

    let record = {
        "@type": record_type,
        "@id": record_id,
        "name": name,
        "actionStatus": "ActiveActionStatus",
        "timeStart": new Date().toISOString(),
        "object": testRecords.thing('Object thing'),
        "instrument": testRecords.thing('Instrument thing'),
        "agent": testRecords.person('Agent thing'),
        "hasPart": []
    }

    if (depth > 0) {

        for (let i = 0; i < 3; i++) {

            let newName = name + '_' + String(i)
            record.hasPart.push(getAction(newName, depth - 1))
        }
    }


    return record


}