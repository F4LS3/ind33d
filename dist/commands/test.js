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
exports.command = void 0;
var discord_buttons_1 = require("discord-buttons");
var discord_js_1 = require("discord.js");
var __1 = require("..");
var importables_1 = require("../importables");
var TestCommand = /** @class */ (function (_super) {
    __extends(TestCommand, _super);
    function TestCommand() {
        return _super.call(this, 'test', 'Testing new(-ish) slash commands', [{ name: 'log', description: 'Enables logging in bots console', type: importables_1.ApplicationCommandOptionType.BOOLEAN }]) || this;
    }
    TestCommand.prototype.callback = function (interaction, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fields = [];
            Object.keys(args).forEach(function (key) { return fields.push({ inline: true, name: key, value: args[key] }); });
            _this.sendButton(interaction, 'Total toller button', [new discord_buttons_1.MessageButton().setStyle('green').setLabel('Total toll!').setID('0')]);
            _this.reply(interaction, new discord_js_1.MessageEmbed({
                fields: fields,
                title: 'Test',
                color: '#60d446',
                timestamp: new Date(),
                author: {
                    name: __1.bot.user.username,
                    iconURL: __1.bot.user.avatarURL()
                },
                thumbnail: {
                    url: __1.bot.user.avatarURL()
                }
            }));
        });
    };
    return TestCommand;
}(importables_1.Command));
exports.command = new TestCommand();
