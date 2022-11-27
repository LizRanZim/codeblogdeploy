const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const { withAuth } = require('../utils/auth');

// Route to display home page (does not need withAuth)

// Shows home page, but when you click on anything you have to login
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['id', 'ASC']],
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      // Setting the list of posts
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(400).json(err);
  }


});


module.exports = router;

// Route to display all posts at endpoint api/posts/all

router.get('/posts/all', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['id', 'ASC']],
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('homepage', {
      posts,
      // Setting the list of posts
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Display post by id (needs withAuth) show it with it's comments
router.get('/posts/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  try {
    const postData = await Post.findByPk(
      req.params.id,
      { include: [{ model: User }, { model: Comment }] }
    );

    const onePost = postData.get({ plain: true });
    console.log(onePost, 'OnePost')

    res.render('post', { onePost, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




// Route to display dashboard (needs with withAuth)

// how do i pull posts by user into dashboard??? Below I have it showing all posts...find logged in user, display posts by that user...but can't seem to access posts, or reduce it show only the posts from the logged in user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll(
      {
        where: { user_id: req.session.user_id },
        attributes: { exclude: ['password'] },
        include: [{
          model: User, 
        }],
      });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)

    res.render('dashboard', {
      posts: posts,
      // Setting the list of posts
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// // Simple display dashboard route for testing
// router.get('/dashboard', (req, res) => {
//   res.render('dashboard');
// });



// Route to display login/signup page  (does not need withAuth)

router.get('/login', (req, res) => {
  res.render('login');
});



// Route to add a post (needs with withAuth)
router.get('/make-post', async (req, res) => {
 try {
  res.render ('make-post', { logged_in: req.session.logged_in})

 } catch (err) {
      res.status(501).json(err);
  }
});


// Route to edit a post by id

// router.put('/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   try {
//     const postData = await Post.findByPk(
//       req.params.id,
//       { include: [{ model: User }, { model: Comment }] }
//     );

//     const onePost = postData.get({ plain: true });
//     console.log(onePost, 'OnePost')

//     res.render('edit-post', { onePost, logged_in: req.session.logged_in });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });






// Test route to return all posts that a user created ****not working
router.get('/createdposts/:id', async (req, res) => {
  try {
      if (!req.body.user_id) {
          const posts = await User.findByPk(req.session.user_id, {
              attributes: { exclude: ['password'] },
              include: [
                  { model: Post }
              ]
          });
          res.status(200).json(posts);
      } else {
          const posts = await User.findByPk(req.body.user_id, {
              attributes: { exclude: ['password'] },
              include: [
                  { model: Post }
              ]
          });
          res.status(200).json(posts);
      }
  } catch (err) {
      res.status(501).json(err);
  }
});



module.exports = router;


