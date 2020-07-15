var express = require('express');
var router = express.Router();
/*
<div class="card mb-4">
        <img class="card-img-top" src="http://placehold.it/750x300" alt="Card image cap">
        <div class="card-body">
            <h2 class="card-title">Post Title</h2>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque,
                nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus
                possimus, veniam magni quis!</p>
            <a href="#" class="btn btn-primary">Read More &rarr;</a>
        </div>
        <div class="card-footer text-muted">
            Posted on January 1, 2020 by
            <a href="#">Start Bootstrap</a>
        </div>
    </div>
*/
const posts = [{
    title: "Post Title",
    image: "http://placehold.it/750x300",
    intro: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque,
    nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus
    possimus, veniam magni quis!`,
    published: "January 1, 2020",
    author: "Start Bootstrap"
  },
  {
    title: "Создаю свой блог",
    image: "https://netolink.ru/wp-content/uploads/2019/10/%D0%91%D0%BB%D0%BE%D0%B3.jpg",
    intro: `Создаю свой первый блог с применением фреймворка express`,
    published: new Date().toLocaleDateString(),
    author: "Шаптала Максим"
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    posts: posts
  });
});

module.exports = router;