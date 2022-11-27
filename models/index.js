const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// A Post belongs to a User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  // constraints: false
  });

// A User has many Posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  // constraints: false
});

// A Comment belongs to a User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
   constraints: false
});

// A User has many Comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  // constraints: false
});

// A Comment belongs to a Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  constraints: false
});

// A Post has many Comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});




module.exports = { User, Post, Comment };