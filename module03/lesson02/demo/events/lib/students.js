function hello() {
    console.log("Hello module");
    test();
}

class Student {
    constructor(name) {
        this.name = name;
    }
}

function test() {
    console.log('test');
}

module.exports.hello = hello;
module.exports.Student = Student;