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
var importables_1 = require("../importables");
var MessageEvent = /** @class */ (function (_super) {
    __extends(MessageEvent, _super);
    function MessageEvent() {
        return _super.call(this, 'message') || this;
    }
    MessageEvent.prototype.callback = function (message) {
        return new Promise(function (resolve, reject) {
            console.log('Message was received!');
            resolve(message);
        });
    };
    return MessageEvent;
}(importables_1.Event));
exports.event = new MessageEvent();
