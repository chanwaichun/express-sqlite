const { Sequelize } = require('sequelize');
const sequlizeMap = {};
const { default: SnowflakeId } = require('snowflake-id');
const snowflake = new SnowflakeId({
  mid: 100,
  offset: (2023 - 1970) * 31536000 * 1000
});

async function mysqlExecute() {
  let sequelizeOpts = {
    host: 'localhost',
    dialect: 'mysql'
  };
  const sequelize = new Sequelize(
    'report_database',
    'root',
    '123456789',
    sequelizeOpts
  );
  try {
    await sequelize.authenticate();
    console.log(
      'Connection has been established successfully.'
    );
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error
    );
  }
  return sequelize;
}

async function sequelizeExecute(dataBase, sql, options) {
  if (!sequlizeMap[dataBase]) {
    let sequelizeOpts = {
      host: 'localhost',
      dialect: 'sqlite',
      storage: dataBase
    };
    // sequelizeOpts.dialectModule = sqlite3
    const sequelize = new Sequelize(
      'database',
      'username',
      'password',
      sequelizeOpts
    );
    try {
      await sequelize.authenticate();
      console.log(
        'Connection has been established successfully.'
      );
    } catch (error) {
      console.error(
        'Unable to connect to the database:',
        error
      );
    }
    sequlizeMap[dataBase] = sequelize;
  }

  const res = await sequlizeMap[dataBase].query(
    sql,
    options
  );
  return res[0];
}

module.exports = {
  mysqlExecute,
  sequelizeExecute,
  snowflake
};
