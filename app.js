const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

//connect DB
mongoose
  .connect(
    'mongodb+srv://admin:2OlBRDNbhT0JrLpo@cluster0.uvxbm5v.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
