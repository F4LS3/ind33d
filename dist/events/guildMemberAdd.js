"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.event = void 0;
var discord_js_1 = require("discord.js");
var __1 = require("..");
var importables_1 = require("../importables");
var logger_1 = require("../logger");
var GuildMemberAddEvent = /** @class */ (function (_super) {
    __extends(GuildMemberAddEvent, _super);
    function GuildMemberAddEvent() {
        return _super.call(this, 'guildMemberAdd') || this;
    }
    GuildMemberAddEvent.prototype.callback = function (member) {
        logger_1.log('hello', logger_1.Level.DEBUG);
        return new Promise(function (resolve, reject) {
            var welcomeChannel = member.guild.channels.cache.find(function (channel) { return channel.id === '846712123978678344'; });
            /*fetch(`https://g.tenor.com/v1/search?key=${process.env.TENOR_KEY}&q=welcome&limit=50`)
            .then(res => res.json())
            .then(json => console.log(json[0].url));*/
            welcomeChannel.send(new discord_js_1.MessageEmbed({
                title: 'Welcome to the server',
                description: member.user.username + " has arrived! Everyone welcome them to the server!",
                color: '#11cbf0',
                author: {
                    iconURL: __1.bot.user.avatarURL(),
                    name: __1.bot.user.username,
                    url: __1.bot.user.avatarURL()
                },
                timestamp: new Date()
            }));
            resolve(member);
        });
    };
    return GuildMemberAddEvent;
}(importables_1.Event));
exports.event = new GuildMemberAddEvent();
