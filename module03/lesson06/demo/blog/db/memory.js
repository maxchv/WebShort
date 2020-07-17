const posts = [{
        _id: 1,
        title: "Доброго вечора",
        image: "http://placehold.it/750x300",
        intro: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque,
    nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus
    possimus, veniam magni quis!`,
        published: "January 1, 2020",
        author: "Start Bootstrap"
    },
    {
        _id: 2,
        title: "Создаю свой блог",
        image: "https://netolink.ru/wp-content/uploads/2019/10/%D0%91%D0%BB%D0%BE%D0%B3.jpg",
        intro: `Создаю свой первый блог с применением фреймворка express`,
        published: new Date().toLocaleDateString(),
        author: "Шаптала Максим"
    },
];

module.exports = {
    findAll: () => posts,
    find: (id) => posts.find((p) => p._id == id)
};