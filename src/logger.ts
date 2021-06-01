export enum Level {
    INFO='INFO',
    DEBUG='DEBUG',
    WARNING='WARNING',
    ERROR='ERROR'
};

export function log(message: any, level: Level) {
    const dateI = new Date();
    const hours = dateI.getHours() + 2 < 10 ? `0${dateI.getHours() + 2}` : dateI.getHours() + 2;
    const minutes = dateI.getMinutes() < 10 ? `0${dateI.getMinutes()}` : dateI.getMinutes();
    const seconds = dateI.getSeconds() + 1 < 10 ? `0${dateI.getSeconds() + 1}` : dateI.getSeconds() + 1;
    const day = dateI.getDate() < 10 ? `0${dateI.getDate()}` : dateI.getDate();
    const month = dateI.getMonth() + 1 < 10 ? `0${dateI.getMonth() + 1}` : dateI.getMonth() + 1;

    const date = `${day}/${month}/${dateI.getFullYear()}`;
    const time = `${hours}:${minutes}:${seconds}`;

    console.log(`${date} ${time} ${level} ${message}`);
}