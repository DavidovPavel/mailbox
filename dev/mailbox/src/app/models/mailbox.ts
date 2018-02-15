export class Mailbox {
  _id: string;
  title: string;
}

export class Mail {
  _id?: string;
  mailbox: string;
  subject: string;
  body: string;
  to: string;
  received?: Date;

  constructor(options: any) {
    this._id = options.id;
    this.mailbox = options.mailbox;
    this.subject = options.subject;
    this.body = options.body;
    this.to = options.to;
    this.received = new Date;
  }
}
