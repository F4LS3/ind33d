"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getApplication = exports.global = exports.bot = void 0;
var discord_js_1 = require("discord.js");
var fs = require("fs");
var logger_1 = require("./logger");
exports.bot = new discord_js_1.Client();
require('discord-buttons')(exports.bot);
require('dotenv').config();
exports.global = {
    interactions: new discord_js_1.Collection(),
    events: new discord_js_1.Collection(),
    buttonEvents: new discord_js_1.Collection()
};
var commandFiles = fs.readdirSync(__dirname + "/commands").filter(function (file) { return file.endsWith('.js' || '.ts'); });
var eventFiles = fs.readdirSync(__dirname + "/events").filter(function (file) { return file.endsWith('.js' || '.ts'); });
var buttonEventFiles = fs.readdirSync(__dirname + "/button_events").filter(function (file) { return file.endsWith('.js' || '.ts'); });
commandFiles.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var command;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(__dirname + "/commands/" + file); })];
            case 1:
                command = (_a.sent()).command;
                return [4 /*yield*/, exports.getApplication().commands.post({
                        data: {
                            name: command.commandName,
                            description: command.commandDescription,
                            options: command.commandOptions
                        }
                    })];
            case 2:
                _a.sent();
                exports.global.interactions.set(command.commandName, command);
                return [2 /*return*/];
        }
    });
}); });
eventFiles.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var event;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(__dirname + "/events/" + file); })];
            case 1:
                event = (_a.sent()).event;
                exports.global.events.set(event.eventName, event);
                exports.bot.on(event.eventName, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return event.callback.apply(event, args)["catch"](function (err) { return console.log("An error occured: " + err.message); });
                });
                return [2 /*return*/];
        }
    });
}); });
buttonEventFiles.forEach(function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var buttonEvent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return require(__dirname + "/button_events/" + file); })];
            case 1:
                buttonEvent = (_a.sent()).buttonEvent;
                exports.global.events.set(buttonEvent.buttonId, buttonEvent);
                return [2 /*return*/];
        }
    });
}); });
exports.bot.ws.on('INTERACTION_CREATE', function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, options, name, args, _i, options_1, option, name_1, value;
    var _b;
    return __generator(this, function (_c) {
        _a = interaction.data, options = _a.options, name = _a.name;
        args = {};
        if (options) {
            for (_i = 0, options_1 = options; _i < options_1.length; _i++) {
                option = options_1[_i];
                name_1 = option.name, value = option.value;
                args[name_1] = value;
            }
        }
        (_b = exports.global.interactions.find(function (value, key) { return key.toLowerCase() === name; })) === null || _b === void 0 ? void 0 : _b.callback(interaction, args)["catch"](function (err) { return logger_1.log(err.message, logger_1.Level.ERROR); });
        return [2 /*return*/];
    });
}); });
exports.bot.login(process.env.TOKEN);
var getApplication = function () {
    var app = exports.bot.api.applications('847206300210430042');
    app.guilds('846138653561585685');
    return app;
};
exports.getApplication = getApplication;
