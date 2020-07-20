const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const uri = process.env.MONGO_URI;

function find(query, callback) {
    const client = new MongoClient(uri, {
        useNewUrlParser: true
    });
    client.connect(err => {
        if (err) return console.error(err);

        const collection = client.db("blog").collection("post");

        collection
            .find(query)
            .sort({
                published: -1
            })
            .skip(0)
            .limit(5)
            .toArray(function (err, posts) {
                if (err) return console.error(err);

                callback(posts);
            });

        client.close();
    });
}

function addPost(post, callback) {
    const client = new MongoClient(uri, {
        useNewUrlParser: true
    });
    client.connect(err => {
        if (err) return console.error(err);

        const collection = client.db("blog").collection("post");

        collection.insertOne(post, callback);

        client.close();
    });
}

module.exports = {
    findAll: (callback) => find({}, callback),
    findById: (id, callback) => find({
        _id: new ObjectId(id)
    }, callback),
    addPost: addPost
}