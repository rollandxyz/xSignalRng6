import { NotifyMessage } from './notify-message';

/** Represent Tab class */
export class Tab {
  messageHistory: NotifyMessage[];
  heading: string;
  title: string;

  constructor(
    heading: string = '',
    title: string = ''
  ) {
    this.heading = heading;
    this.title = title;
    this.messageHistory = [];
  }
}
