export class Contact {
    public id       : string;
    public name     : string;
    public email    : string;
    public phone    : string;
    public imageUrl : string;
    public group    : Contact[] | null;

    constructor(id: string, name: string, email: string, phone: string, imageUrl: string, group: Contact[]){
        this.id = (id ? id : new Date().getTime().toString()); // unique number based on time if none present
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}