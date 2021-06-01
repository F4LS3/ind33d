"use strict";
exports.__esModule = true;
exports.log = exports.Level = void 0;
var Level;
(function (Level) {
    Level["INFO"] = "INFO";
    Level["DEBUG"] = "DEBUG";
    Level["WARNING"] = "WARNING";
    Level["ERROR"] = "ERROR";
})(Level = exports.Level || (exports.Level = {}));
;
function log(message, level) {
    var dateI = new Date();
    var hours = dateI.getHours() + 2 < 10 ? "0" + (dateI.getHours() + 2) : dateI.getHours() + 2;
    var minutes = dateI.getMinutes() < 10 ? "0" + dateI.getMinutes() : dateI.getMinutes();
    var seconds = dateI.getSeconds() + 1 < 10 ? "0" + (dateI.getSeconds() + 1) : dateI.getSeconds() + 1;
    var day = dateI.getDate() < 10 ? "0" + dateI.getDate() : dateI.getDate();
    var month = dateI.getMonth() + 1 < 10 ? "0" + (dateI.getMonth() + 1) : dateI.getMonth() + 1;
    var date = day + "/" + month + "/" + dateI.getFullYear();
    var time = hours + ":" + minutes + ":" + seconds;
    console.log(date + " " + time + " " + level + " " + message);
}
exports.log = log;
