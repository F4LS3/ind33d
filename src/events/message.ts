import { Message } from "discord.js";
import { Event } from "../importables";

class MessageEvent extends Event {

    constructor() {
        super('message');
    }

    public callback(message: Message): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('Message was received!');
            resolve(message);
        });
    }

}

export const event = new MessageEvent();