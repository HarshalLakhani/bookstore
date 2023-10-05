const express = require('express');
const mongoose = require('mongoose')
const checkMissingData = require('./middleware');
const db = require('./db');
db()
const route = express();
route.use(express.json());


const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);


route.get('/', (req, res) => {
    res.send('welcome to the book store');
});

route.get('/books/book/:id', async (req, res) => {

    const { id } = req.params

    const getid = await Book.findById(id)
    if (getid) {
        res.status(200).send(getid)
    }
    else {

        res.status(404).send("error")
    }

});

route.delete('/books/delete/:id', async (req, res) => {
    const { id } = req.params
    const del = await Book.findByIdAndDelete(id)
    const nodel = await Book.find(req.body)

    res.send(nodel)
})

route.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});


route.post('/books/addbooks', checkMissingData, async (req, res) => {

    const postdata = await Book.create(req.body)
    res.send(postdata)

});

route.patch('/books/update/:id', async (req, res) => {

    const {id} = req.params

    const update = await Book.findOneAndUpdate({_id : id},{$set : req.body})
    res.send(update)

});

route.get('/books/filter', async (req, res) => {
    const { author, category, sort } = req.query;

    let filter = {};

    if (author) filter.author = author;
    if (category) filter.category = category;

    const books = await Book.find(filter)
    res.send(books);
});


route.listen(8090, () => {
    console.log("Running on port 8090");

});