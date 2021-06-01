import { GuildMember, MessageEmbed, TextChannel } from "discord.js";
import { bot } from "..";
import { Event } from "../importables";
import * as fetch from 'node-fetch';
import { Level, log } from "../logger";

class GuildMemberAddEvent extends Event {
    constructor() {
        super('guildMemberAdd');
    }

    public callback(member: GuildMember): Promise<any> {
        log('hello', Level.DEBUG);
        return new Promise((resolve, reject) => {
            const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '846712123978678344') as TextChannel;

            /*fetch(`https://g.tenor.com/v1/search?key=${process.env.TENOR_KEY}&q=welcome&limit=50`)
            .then(res => res.json())
            .then(json => console.log(json[0].url));*/

            welcomeChannel.send(new MessageEmbed({
                title: 'Welcome to the server',
                description: `${member.user.username} has arrived! Everyone welcome them to the server!`,
                color: '#11cbf0',
                author: {
                    iconURL: bot.user.avatarURL(),
                    name: bot.user.username,
                    url: bot.user.avatarURL()
                },
                timestamp: new Date()
            }));

            resolve(member);
        });
    }
}

export const event = new GuildMemberAddEvent();