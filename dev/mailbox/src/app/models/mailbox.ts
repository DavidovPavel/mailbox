export class Mailbox {
  _id: string;
  title: string;
}

export class Mail {
  mailbox: string;
  subject: string;
  body: string;
  to: string;
}
