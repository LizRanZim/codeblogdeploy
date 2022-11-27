const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Endpoint api/posts

// Create a post
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        user_id: req.session.user_id,
        post_name: req.body.post_name,
        post_description: req.body.post_description
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

//Update a post


// Route to update a post (needs with withAuth)
router.put('/:id', async (req, res) => {
  console.log(req)
  try {
    const newPost = await Post.update(req.body,{
      where: {
        id:req.params.id,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});


//  Display all posts
router.get('/', async (req, res) => {
  try {
      const posts = await Post.findAll({
         order: [['id', 'ASC']],
      });

      res.status(200).json(posts);
  } catch (err) {
      res.status(501).json(err);
  }
});

// Delete a post by id

router.delete('/:id', async (req, res) => {

  try {
    const posts = await Post.destroy ({
      where: {
        id: req.params.id
      }
    })

res.status(200).json(posts);
  } catch (err) {
    console.error((err));
    res.status(502).json(err);
  }
});

module.exports = router;