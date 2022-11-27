const { Post } = require('../models');

const postData = [
  {
    post_name: 'HTML is important',
    post_description: 'Hyper Text Markup Language is really important.',
    user_id: 1,
  },
  {
    post_name: 'CSS is important',
    post_description: 'Cascading Style Sheets are really really important.',
    user_id: 2,
  },
  {
    post_name: 'MVC is important',
    post_description: 'Model, View, Controller is super important.',
    user_id: 3,
  },
  {
    post_name: 'JavaScript is important',
    post_description: 'JavaScript is really flexible.',
    user_id: 4,
  },
  {
    post_name: 'Handlebars is important',
    post_description: 'Handlebars is really efficient.',
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;