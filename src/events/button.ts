import { global } from "..";
import { Event } from "../importables";
import { Level, log } from "../logger";

class ButtonClick extends Event {
    constructor() {
        super('clickButton');
    }

    public callback(button): Promise<any> {        
        return new Promise(async (resolve, reject) => {
            const matchingButtons = global.buttonEvents?.filter(buttonEvent => buttonEvent.buttonId === button.id);
            
            if(!matchingButtons) reject(new Error('No matching buttons found'));

            matchingButtons.forEach(buttonEvent => buttonEvent.callback(button));
            resolve(matchingButtons);
        });
    }
}

export const event = new ButtonClick();