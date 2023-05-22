const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Book = require('./models/book');

mongoose.connect('mongodb://127.0.0.1:27017/Library');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Connection Error"));
db.once('open',()=>{
    console.log("Connected to MongoDB");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Display All Books
app.get('/',async (req,res)=>{
    try {
        const books = await Book.find();
        res.json(books);
      } catch (error) {
        res.status(500).json({ error: 'Books are not available' });
      }
})

//Create New Book
app.post('/', async (req,res)=>{
    try {
        const { title, author, genre } = req.body;
        const book = await Book.create({ title, author, genre });
        res.status(201).json(book);
      } catch (error) {
        res.status(500).json({ error: 'Invalid Credentials' });
      }
})

//Get Specific Book from it's ID
app.get('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve the book' });
        }
  });

//Update Book by it's ID
app.put('/:id',async (req,res)=>{
    const {id} = req.params
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
      } catch (error) {
        res.status(500).json({ error: 'Could not update the book' });
      }

});

//Delete a book by ID
app.delete('/:id', async (req,res)=>{
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Could not delete the book' });
      }
})

//Any other requests sent to any other link will be invalid
app.all('*',(req,res,next)=>{
    res.send("Could not find the page")
    console.log("Not Found");
    next();
})

app.listen(3000,()=>{
    console.log("Connected to Port 3000");
})
