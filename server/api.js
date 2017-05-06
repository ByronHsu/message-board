const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
let Posts=[];
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/Posts', (req, res) => {
  res.json(Posts);
});
router.post('/Post', (req, res) => {
  Posts.push(req.body);
  res.send('Post added');
});
router.post('/Post/Comment', (req, res) => {
  Posts[req.query.Postid].Comments.push(req.body);
  res.send('Comment added');
});
router.post('/Post/Comment/Reply', (req, res) => {
  Posts[req.query.Postid].Comments[req.query.Commentid].Replys.push(req.body);
  res.send('Reply added');
});
module.exports = router;