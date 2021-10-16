export class Document {
    // public id               : string;
    // public name             : string;
    // public description      : string;
    // public url              : string;
    // public children         : Document[];

    constructor(public id: string, public name: string, public description: string, public url: string, public children: Document[]){
        // this.id = (id ? id : new Date().getTime().toString()); // unique number based on time if none present
        // this.name = name;
        // this.description = description;
        // this.url = url;
        // this.children = children;
    }
}