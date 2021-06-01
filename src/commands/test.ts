import { MessageButton } from "discord-buttons";
import { EmbedField, MessageEmbed, TextChannel } from "discord.js";
import { bot } from "..";
import { Command, ApplicationCommandOptionType } from "../importables";

class TestCommand extends Command {
    constructor() {
        super('test', 'Testing new(-ish) slash commands', [{ name: 'log', description: 'Enables logging in bots console', type: ApplicationCommandOptionType.BOOLEAN }]);
    }

    public callback(interaction, args) {
        return new Promise((resolve, reject) => {
            const fields: EmbedField[] = [];
            Object.keys(args).forEach(key => fields.push({ inline: true, name: key, value: args[key] }));

            this.sendButton(interaction, 'Total toller button', [new MessageButton().setStyle('green').setLabel('Total toll!').setID('0')]);

            this.reply(interaction, new MessageEmbed({
                fields: fields,
                title: 'Test',
                color: '#60d446',
                timestamp: new Date(),
                author: {
                    name: bot.user.username,
                    iconURL: bot.user.avatarURL()
                },
                thumbnail: {
                    url: bot.user.avatarURL()
                }
            }));
        });
    }

}

export const command = new TestCommand();