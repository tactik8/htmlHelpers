
import { Webpage } from './classWebpage.js'
import { htmlTemplates} from "./htmlTemplates/htmlTemplates.js"


export class Website {
    /**
     *
     *
     * Initializing:
     * 
     * let website = new KrakenWebsite()
     * website.addHeader("Data", "/data");
     * website.addHeader("Test", "/test");
     * website.addFooter("Data", "/data");
     * website.addFooter("Test", "/test");
     * website.legalName = "Kraken";
     * website.name = "Kraken API";
     * website.path = '/api/data'
     *
     * Initializing pages:
     * let page = website.newPage(req)
     *
     */
    constructor(record) {
        this._record = record || {};
        this._pages = [];
        this.htmlHeaderTemplate = ''
        this.htmlFooterTemplate = ''
        this.htmlHeaderContent = ''
        this.htmlFooterContent = ''
    }

   
    get page() {
        return this.newPage();
    }

    newPage(record) {
        /**
         * Create a new page
         * 
         */
        
        let page = new Webpage(record);
        this._pages.push(page)
        return page;
    }

    get record() {
        return this._record;
    }

    set record(value) {
        this._record = value;
    }

    get name(){
        return this._record.name
    }
    set name(value) {
        this._record.name = value;
        this.wpHeader.name = value;
        this.wpFooter.name = value;
    }

    get hasPart(){

        this._record.hasPart = this._record.hasPart || []
        this._record.hasPart = Array.isArray(this._record.hasPart) ? this._record.hasPart : [this._record.hasPart]
       
        return this._record.hasPart
    }
    
    set hasPart(value){
        this._record.hasPart = this._record.hasPart || []
        value = Array.isArray(value) ? value : [value];
        this._record.hasPart = value
    }

    get header(){
        return this.wpHeader
    }
    
    get wpHeader() {
        
        for (let p of this.hasPart) {
            if (p?.["@type"] == "WPHeader") {
                return p;
            }
        }

        // Create new
        let r = { "@type": "WPHeader", name: this._record.name, hasPart: [] };
        
        this.hasPart.push(r);
        return r;
    }

    addHeaderLink(name, url) {
        let newWebpage = { "@type": "WebPage", name: name, url: url };

        this.wpHeader.hasPart = this.wpHeader.hasPart || []
       
        this.wpHeader.hasPart.push(newWebpage);
        
    }


    get footer(){
        return this.wpFooter
    }
    
    get wpFooter() {
        for (let p of this.hasPart) {
            if (p?.["@type"] == "WPFooter") {
                return p;
            }
        }

        // Create new
        let r = { "@type": "WPFooter", name: this._record.name, hasPart: [] };

        this.hasPart.push(r);
        return r;
    }

    addFooterLink(name, url) {
        let newWebpage = { "@type": "WebPage", name: name, url: url };
        this.wpFooter.hasPart = this.wpFooter.hasPart || []
        this.wpFooter.hasPart.push(newWebpage);
    }

    add(content) {
        this._content += content;
    }

    addSection(content) {
        this._content += base.section(content);
    }


    get organization(){
        this._record.organization = this._record?.organization || {}
        return this._record?.organization
    }

    set organization(value){
        this._record.organization = value
    }


    get brand(){
        this.organization.brand = this.organization?.brand || {}
        return this.organization?.brand;
    }

    set brand(value){
        this.organization.brand = value
    }
    
    get legalName() {
        return this.organization?.legalName;
    }

    set legalName(value) {
        this.organization.name = value
    }


    get logo(){
        return this.brand?.logo
    }
    
    set logo(url){
        this.brand.logo = url
    }
    


    // -----------------------------------------------------
    //  HTML Content 
    // -----------------------------------------------------


    async initHtml(){
        await this.renderHtmlHeader()
        await this.renderHtmlFooter()
    }
    
    async renderHtmlHeader(){

        
        this.htmlHeaderContent =  await htmlTemplates.render(this.htmlHeaderTemplate, this.wpHeader)
        return this.htmlHeaderContent
        
    }

    async renderHtmlFooter(){
        this.htmlFooterContent = await htmlTemplates.render(this.htmlFooterTemplate, this.wpFooter)
        return this.htmlFooterContent
    }
   

    getContent(pageContent=''){
        /**
         * Get the content of the website
         */
        
        let content = this.htmlHeaderContent + pageContent + this.htmlFooterContent
        return content
    }

}

