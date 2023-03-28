const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log("*********************************************************");
  console.log("post-get:" + req.params.id);
  console.log("*********************************************************");
  try {
    const posts = await Post.findAll({
      userId: req.session.userId,
    });

    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  console.log("*********************************************************");
  console.log("post-post:" + req.params.id);
  console.log("*********************************************************");
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {    
    console.log("*********************************************************");
    console.log("postId1:" + req.params.id);
    console.log("*********************************************************");
    const post = await Post.findByPk (req.params.id);
    console.log("*********************************************************");
    console.log("postId2:" + req.params.id);
    console.log("*********************************************************");
    const comments = await Comment.findAll({
      where: {
        postId: req.params.id
      },
    })
    res.status(200).json(post, comments);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
        where: {
          id: req.params.id
        },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
