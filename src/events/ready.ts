import { Event } from "../importables";
import { Level, log } from "../logger";

class ReadyEvent extends Event {
    constructor() {
        super('ready');
    }

    public callback(): Promise<any> {
        return new Promise((resolve, reject) => {
            log('Bot ready for use', Level.INFO);
            resolve(undefined);
        });
    }
    
}

export const event = new ReadyEvent();