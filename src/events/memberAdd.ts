import { Event } from "../importables";

class MemberAddEvent extends Event {
    constructor() {
        super('guildMemberAdd');
    }

    public callback(args?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log(args);
            resolve(undefined);
        });
    }

}

export const event = new MemberAddEvent();