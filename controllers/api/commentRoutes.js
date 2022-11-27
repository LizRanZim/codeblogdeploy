const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Endpoint for /api/comments

//create a comment
router.post('/', async (req, res) => {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });


//   router.post('/', async (req, res) => {
//     try {
//         if (!req.body.user_id) {
//             const newComment = await Comment.create({
//                 comment_text: req.body.content,
//                 user_id: req.session.user_id,
//                 post_id: req.body.post_id
//             });
//             res.status(200).json(newComment);
//         } else {
//             const newComment = await Comment.create({
//                 comment_text: req.body.content,
//                 user_id: req.body.user_id,
//                 post_id: req.body.post_id
//             });
//             res.status(200).json(newComment); 
//         }
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

//  Display all comments
router.get('/', async (req, res) => {
  try {
      const comments = await Comment.findAll({
         order: [['id', 'ASC']],
      });

      res.status(200).json(comments);
  } catch (err) {
      res.status(501).json(err);
  }
});

// Delete a comment by id

router.delete('/:id', async (req, res) => {

  try {
    const comments = await Comment.destroy ({
      where: {
        id: req.params.id
      }
    })

res.status(200).json(comments);
  } catch (err) {
    res.status(502).json(err);
  }
});

module.exports = router;