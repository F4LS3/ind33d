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
var logger_1 = require("../logger");
var ReadyEvent = /** @class */ (function (_super) {
    __extends(ReadyEvent, _super);
    function ReadyEvent() {
        return _super.call(this, 'ready') || this;
    }
    ReadyEvent.prototype.callback = function () {
        return new Promise(function (resolve, reject) {
            logger_1.log('Bot ready for use', logger_1.Level.INFO);
            resolve(undefined);
        });
    };
    return ReadyEvent;
}(importables_1.Event));
exports.event = new ReadyEvent();
