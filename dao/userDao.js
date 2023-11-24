const {
  mysqlExecute,
  snowflake
} = require('../util/index');
const { secretKey } = require('../util/constant');
const jwt = require('jsonwebtoken');
// const sequelize = require('@/utils/sequelize.js')
module.exports = {
  login: async function (req, res, next) {
    const token = jwt.sign(
      { username: 'chanwaichun' },
      secretKey,
      { expiresIn:'30d' , algorithm: 'HS256' }
    );
    res.status(200);
    res.json({
      code: 200,
      data: token
    });
  },
  getUser: async function (req, res, next) {
    try {
      const sequelize = await mysqlExecute();
      const [results] = await sequelize.query(
        'SELECT userId,phone FROM user'
      );
      console.log(a);
      res.status(200);
      res.json({
        code: 200,
        data: results
      });
    } catch (e) {
      next(e);
    }
  },
  addUser: async function (req, res, next) {
    try {
      const params = req.body;
      console.log(params);
      const { userName, phone, password } = params;
      if (!(userName && phone && password)) {
        res.status(500);
        res.json({
          code: 500,
          message: '请完善表单',
          data: null
        });
        return;
      }
      const sequelize = await mysqlExecute();
      await sequelize.query(
        'INSERT INTO user (userName,userId,phone,password) VALUES (?,?,?,?)',
        {
          replacements: [
            userName,
            snowflake.generate(),
            phone,
            password
          ]
        }
      );
      res.status(200);
      res.json({
        code: 200,
        data: []
      });
    } catch (e) {
      next(e);
    }
  }
};
