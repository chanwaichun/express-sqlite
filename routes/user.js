var express = require('express');
var router = express.Router();
const {
  getUser,
  addUser,
  login
} = require('../dao/userDao');
/* GET home page. */
router.get('/getUser', async function (req, res, next) {
  await getUser(req, res, next);
  // next()
});
router.post('/addUser', async function (req, res, next) {
  await addUser(req, res, next);
  // next()
});
router.get('/login', async function (req, res, next) {
  await login(req, res, next);
  // next()
});

module.exports = router;
