import { Client, Collection } from 'discord.js';
import * as fs from 'fs';
import { ButtonEvent, Command, Event } from './importables';
import { Level, log } from './logger';

export const bot = new Client();

require('discord-buttons')(bot);
require('dotenv').config();

export const global = {
    interactions: new Collection<string, Command>(),
    events: new Collection<string, Event>(),
    buttonEvents: new Collection<string, ButtonEvent>()
};

const commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js' || '.ts'));
const eventFiles = fs.readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js' || '.ts'));
const buttonEventFiles = fs.readdirSync(`${__dirname}/button_events`).filter(file => file.endsWith('.js' || '.ts'));

commandFiles.forEach(async file => {
    const { command } = await import(`${__dirname}/commands/${file}`);

    await getApplication().commands.post({
        data: {
            name: command.commandName,
            description: command.commandDescription,
            options: command.commandOptions
        }
    });

    global.interactions.set(command.commandName, command);
});

eventFiles.forEach(async file => {
    const { event } = await import(`${__dirname}/events/${file}`);
    global.events.set(event.eventName, event);

    bot.on(event.eventName, (...args) => event.callback(...args).catch(err => console.log(`An error occured: ${err.message}`)));
});

buttonEventFiles.forEach(async file => {
    const { buttonEvent } = await import(`${__dirname}/button_events/${file}`);
    global.events.set(buttonEvent.buttonId, buttonEvent);
});

(bot as any).ws.on('INTERACTION_CREATE', async interaction => {
    const { options, name } = interaction.data;

    const args = {};

    if (options) {
        for (const option of options) {
            const { name, value } = option;
            args[name] = value;
        }
    }

    global.interactions.find((value, key) => key.toLowerCase() === name)?.callback(interaction, args).catch(err => log(err.message, Level.ERROR));
});

bot.login(process.env.TOKEN);

export const getApplication = () => {
    const app = (bot as any).api.applications('847206300210430042');
    app.guilds('846138653561585685');
    return app;
}