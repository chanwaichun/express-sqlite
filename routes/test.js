var express = require('express');
var router = express.Router();
var path = require('path');
let fs = require('fs');
let { getPageBySql } = require('../dao/commonDao');
/* GET users listing. */
router.post('/getApplicationV2', async (req, res, next) => {
   await getPageBySql(req,res)
});
// router.get('/info')

module.exports = router;
