
import * as helpers from 'jsonld_helpers'
import { htmlTemplates } from '../htmlTemplates/htmlTemplates.js'

export class BaseClass {
    constructor(record, options) {

        this.templateID = "basicTemplate/components/record"
        this._options = {}
        this._record = {}
        this._hasPart = []
        this.wrapper = ''

        this.query = {}


        if(options){
            this.options = options
        }

        // If record is string, add as a part
        if (record && record.isBaseClass == true) {
            this._hasPart.push(record)
        }
        else if (record && typeof record == "string") {
            this._hasPart.push(record)
        }
        else {
            this.record = record || {}
        }
    }

    get isBaseClass() {
        return true
    }

    toString() {
        return this.text
    }

    toJSON() {
        return this.record
    }

    get record() {
        this._record = this._record || {}
        return this._record
    }

    set record(value) {
        this._record = value
    }
    
    get options() {
        this._options = this._options || {}
        return this._options
    }

    set options(value) {
        this._options = value
    }


    get text() {
        return this.record?.text || ""
    }

    set text(value) {
        this.record = this.record || {}
        this.record.text = value
    }


    get baseUrl(){
        return this.options?.baseUrl
    }

    set baseUrl(value){
        this.options.baseUrl = value
    }


    get url() {
        return this.record?.url || ""
    }

    set url(value) {
        this.record = this.record || {}
        this.record.url = value
    }

    get hasPart() {
        this.record.hasPart = this.record?.hasPart || []
        return this.record?.hasPart
    }
    set hasPart(value) {
        this.record.hasPart = Array.isArray(value) ? value : [value]
    }

    get name() {
        return this.record?.name || ""
    }

    set name(value) {
        this.record = this.record || {}
        this.record.name = value
    }

    add(value) {
        if(value.isBaseClass==true){
            for(let k of Object.keys(this.options)){
                value.options[k] = value.options?.[k] || this.options?.[k]
            }
        }
        this._hasPart.push(value)
        return value
    }


    async get(record) {
        if (record) {
            this.record = record
        }
        return await this.render()
    }


    async render() {

        this.text = ''

        // render parts
        for (let p of (this._hasPart || [])) {
            if (p.isBaseClass == true) {
                this.text += await p.get()
            } else {
                this.text += String(p)
            }
        }

        // Render template
        if (this.templateID) {
          

            this.text = await htmlTemplates.render(this.templateID, this.record, this.options)
        }

        // Render wrapper
        if (this.wrapper && this.wrapper.includes('{{BODY}}')) {
            this.text = this.wrapper.replaceAll('{{BODY}}', this.text)
        }


        return this.text

    }


}


export class Article extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/article"
    }
}

export class Card extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/card"
    }
}

export class CardHorizontal extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/cardHorizontal"
    }
}

export class Cards extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/cards"
    }
}

export class Carousel extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/carousel"
    }
}

export class Chip extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/chip"
    }
}

export class Comments extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/comments"
    }
}

export class Dropdown extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/dropdown"
    }
}

export class Image extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/image"
    }
}

export class ImageModal extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/imageModal"
    }
}


export class ImageThumbnail extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/imageThumbnail"
    }
}

export class Menu extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/menu"
    }
}

export class Modal extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/modal"
    }
}

export class Record extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/blocks/record"
    }

    
}

export class Records extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/blocks/records"
        this.properties = [ "position", "@type", "item.@type", "item.@id","item.name", "item.url" ]
        this.options = {
            "columns": [
                {"propertyID": "position", "name": "#"},
                {"propertyID": "item.@type", "name": "Type"},
                {"propertyID": "item.@id", "name": "Id"},
                {"propertyID": "item.name", "name": "Name"},
                {"propertyID": "item.url", "name": "Url"}
            ]

        }
    }


}

export class StarRating extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/starRating"
    }
}

export class Table extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/table"
    }
}

export class Value extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = "basicTemplate/components/value"
    }
}

export class Section extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<section class="container">{{BODY}}</section>'
    }

}
export class Div extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<div class="container">{{BODY}}</div>'
    }
}

export class H1 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H1>{{BODY}}</H1>'
    }
}

export class H2 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H2>{{BODY}}</H2>'
    }
}

export class H3 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H3>{{BODY}}</H3>'
    }
}

export class H4 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H4>{{BODY}}</H4>'
    }
}

export class H5 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H5>{{BODY}}</H5>'
    }
}

export class H6 extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<H6>{{BODY}}</H6>'
    }
}

export class text extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<p>{{BODY}}</p>'
    }
}

export class p extends BaseClass {
    constructor(record) {
        super(record)
        this.templateID = undefined
        this.wrapper = '<p>{{BODY}}</p>'
    }
}

export class WebPage extends BaseClass {
    constructor(record, options) {
        super(record, options)
        this.templateID = 'basicTemplate/blocks/page'

    }

    section(content) {
        return this.add(new Section(content))
    }

    div(content) {
        return this.add(new Div(content))
    }
    H1(content) {
        return this.add(new H1(content))
    }
    H2(content) {
        return this.add(new H2(content))
    }
    H3(content) {
        return this.add(new H3(content))
    }
    p(content) {
        return this.add(new p(content))
    }

}



export class WebSite extends BaseClass {
    constructor(record, options) {
        super(record, options)
        this.templateID = 'basicTemplate/components/page'

    }


    get wpHeader() {

        for (let p of this.hasPart) {
            if (p?.["@type"] == "WPHeader") {
                return p;
            }
        }
        // Create new
        let r = { "@type": "WPHeader", name: this._record?.name, hasPart: [] };
        this.hasPart.push(r);
        return r;
    }

    addHeaderLink(name, url) {
        let newWebpage = { "@type": "WebPage", name: name, url: url };
        this.wpHeader.hasPart = this.wpHeader.hasPart || []
        this.wpHeader.hasPart.push(newWebpage);

    }



    get footer() {
        return this.wpFooter
    }

    get wpFooter() {
        for (let p of this.hasPart) {
            if (p?.["@type"] == "WPFooter") {
                return p;
            }
        }

        // Create new
        let r = { "@type": "WPFooter", name: this._record?.name, hasPart: [] };
        this.hasPart.push(r);
        return r;
    }

    addFooterLink(name, url) {
        let newWebpage = { "@type": "WebPage", name: name, url: url };
        this.wpFooter.hasPart = this.wpFooter.hasPart || []
        this.wpFooter.hasPart.push(newWebpage);
    }

    webpage(url) {
        let webpage = new WebPage(JSON.parse(JSON.stringify(this.record, null, 4)))
        webpage.templateID = this.templateID
        webpage.wrapper = this.wrapper


        try {
            webpage.url = (new URL(url, this.url) || "").toString()
        } catch(err){}
        this.add(webpage)
        return webpage
    }




}


