const EventEmitter = require('events');
const fs = require('fs');

//console.log(process.argv);

// Events события
const myEvents = new EventEmitter();
// addListener, on - подписка на событие
// once - подписка на событие, которое перехватывается единожды
// removeListener - отписаться от события
// removeAllListeners - отписаться от всех событий
myEvents.on('greeting', function (name) {
    console.log(`Hello ${name}`);
});

myEvents.on('greeting', function (name) {
    console.log(`Your name is ${name}`);
})

//myEvents.removeAllListeners('greeting');
myEvents.emit('greeting', process.argv[2] || 'Unknown');
myEvents.emit('greeting', 'World');

// асинхронный режим
// fs.readFile(process.argv[3], function (err, data) {
//     console.log(data.toString('utf-8'));
// });

// Типы stream:
// ------------
// Readable - на чтение
// Writable - на запись
// Duplex - и чтение и запись
// Transformation - для преобразования
const fileStream = fs.createReadStream('index.js');

fileStream.setEncoding('utf-8');

fileStream.on('data', function (err, data) {
    if (err) return console.error(err);
    console.log(data);
});

fileStream.on('error', function (err) {
    console.error(err);
});

fileStream.on('end', function () {
    console.log("Данные считаны полностью");
});

const writeStream = fs.createWriteStream("hello.txt");
writeStream.write("Hello World");
writeStream.end("!");
writeStream.close();

const rs = fs.createReadStream('hello.txt');
const ws = fs.createWriteStream('copy.txt');
rs.pipe(ws);

//console.log(myEvents.listeners('greeting'));

// "  Полный путь до файла будет передан в качестве первого аргумента командной строки.\
// Вам не нужно создавать тестовый файл самостоятельно. "
// const fs = require("fs");
// bf = fs.readFileSync(process.argv[2]);
// str = String(bf);
// /* console.log(str); */
// masiv = str.split("\n");
// /* console.log(masiv); */
// console.log(masiv.length);