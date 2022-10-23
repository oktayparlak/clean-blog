const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const pageController = require('./controllers/pageController');
const postController = require('./controllers/postController');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);


app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);


const port = 3000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
