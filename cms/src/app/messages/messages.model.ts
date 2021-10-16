export class Message {
    // public id          : string;
    // public subject     : string;
    // public msgText     : string;
    // public sender      : string;

    constructor(public id: string, public subject: string, public msgText: string, public sender: string){
        // this.id = (id ? id : new Date().getTime().toString()); // unique number based on time if none present
        // this.subject = subject;
        // this.msgText = msgText;
        // this.sender = sender;
    }
}