const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PostSchema = new Schema({
  title: String,
  detail: String,
  dataCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
