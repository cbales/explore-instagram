var router        = require('express').Router();
var cookieParser  = require('cookie-parser');
var instagramApi  = require('instagram-node').instagram();
var config        = require('./config');


/* Redirect user to Instagram for authentication */
router.get('/authorize-user', function (req, res) {
  instagramApi.use({
    client_id: config.instagram_client_id,
    client_secret: config.instagram_client_secret
  });
  res.redirect(instagramApi.get_authorization_url(config.instagram_redirect_uri, {scope: ['public_content']}));
});

/* Set cookie once Instagram sends access code */
router.get('/handleauth', function (req, res) {
  instagramApi.authorize_user(req.query.code, config.instagram_redirect_uri, function (err, result) {
    if (err)
      console.log(err.body)
    else {
      res.cookie('instagramToken',result.access_token, { maxAge: 900000, httpOnly: true });
      res.redirect('/');
    }
  });
  
});

/* Check authorization */
router.get('/instagram', function (req, res) {
  if (req.cookies.instagramToken) {
    instagramApi.use({ access_token: req.cookies.instagramToken });
    res.json({instagramToken: req.cookies.instagramToken, showLogin: false});
  } else {
    res.json({showLogin: true});
  }
});

/* Fetch media by tag */
router.post('/instagram', function(req, res) {
  instagramApi.use({access_token: req.cookies.instagramToken });
  instagramApi.tag_media_recent(req.body.text, function(err, medias, pagination, remaining, limit) {
    if (err)
      console.log('Error: ' + err);
    else {
      res.json(medias);
    }
  });
});

module.exports = router;