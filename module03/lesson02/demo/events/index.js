const students = require('./lib/students.js');
const movie = require('./lib/movie.js');

console.log(movie());
console.log(students);
students.hello();

let vasja = new students.Student('Вася');
console.dir(vasja);