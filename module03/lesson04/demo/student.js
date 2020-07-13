const students = [{
        name: "Вася",
        age: 19
    },
    {
        name: "Маша",
        age: 23
    },
    {
        name: "Рома",
        age: 17
    },
];

module.exports = {
    get: function (request, response, next) {
        let id = parseInt(request.params.id);
        if (!isNaN(id)) {
            let idx = id - 1;
            let s = students[idx];
            response.send(`<h1>${s.name}, ${s.age}</h1>`);
        }
        response.send(`Id = ${request.params.id}`);
    }
}