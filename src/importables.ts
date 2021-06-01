import { MessageButton } from "discord-buttons";
import { APIMessage, TextChannel } from "discord.js";
import { bot } from ".";

type CommandOption = {
    name: string,
    description: string,
    type: ApplicationCommandOptionType,
    required?: boolean
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
}

export abstract class Command {
    public commandName: string;
    public commandDescription: string;
    public commandOptions: CommandOption[];

    constructor(commandName: string, commandDescription: string, commandOptions?: CommandOption[]) {
        this.commandName = commandName;
        this.commandDescription = commandDescription;
        this.commandOptions = commandOptions;
    }

    public abstract callback(interaction: any, options?: object): Promise<any>;

    public async reply(interaction: any, response: any) {
        let data = {
            content: response
        };

        if(typeof response === 'object') {
            data = await this.createAPIMessage(interaction, response);
        }

        (bot as any).api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data
            }
        })
    }

    public async send(interaction: any, response: any) {
        const channel: TextChannel = bot.channels.resolve(interaction.channel_id) as TextChannel;

        channel.send(response);
    }

    public async sendButton(interaction: any, response: any, buttons: MessageButton[]) {
        const channel: any = bot.channels.resolve(interaction.channel_id) as TextChannel;

        await channel.send(response, { buttons: buttons });
    }

    private async createAPIMessage(interaction, content) {
        const { data, files } = await (APIMessage as any).create(
            bot.channels.resolve(interaction.channel_id),
            content
        )
        .resolveData()
        .resolveFiles();

        return { ...data, files };
    }
};

export abstract class Event {
    public eventName: string;
    
    constructor(eventName: string) {
        this.eventName = eventName;
    }

    public abstract callback(args?: any): Promise<any>;
};

export abstract class ButtonEvent {
    public buttonId: string;

    constructor(buttonId: string) {
        this.buttonId = buttonId;
    }

    public abstract callback(button: any): Promise<any>;
}