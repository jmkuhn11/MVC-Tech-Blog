const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {

    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });
    
    res.render('viewPost', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {

    // Find the logged in user based on the session ID
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId
      },
      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {

    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route

   if (req.session.logged_in) {
     res.redirect('/dashboard');
     return;
   }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});



router.get('/viewPost', (req, res) => {
  res.render('viewPost');
});

module.exports = router;
