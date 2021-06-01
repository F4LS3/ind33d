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
var MemberAddEvent = /** @class */ (function (_super) {
    __extends(MemberAddEvent, _super);
    function MemberAddEvent() {
        return _super.call(this, 'guildMemberAdd') || this;
    }
    MemberAddEvent.prototype.callback = function (args) {
        return new Promise(function (resolve, reject) {
            console.log(args);
            resolve(undefined);
        });
    };
    return MemberAddEvent;
}(importables_1.Event));
exports.event = new MemberAddEvent();
