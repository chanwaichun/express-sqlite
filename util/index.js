const {Sequelize} = require("sequelize");
async function sequelizeExecute(
    dataBase,
    sql,
    options
) {
    let sequelizeOpts = {
        host: 'localhost', dialect: 'sqlite', storage: dataBase, pool: {  //数据库连接池
            max: 20,  //最大连接对象的个数
            min: 5,  //最小连接对象的个数
            idle: 1000  //最长等待时间，单位为毫秒
        }

    }
// sequelizeOpts.dialectModule = sqlite3
    const sequelize = new Sequelize('database', 'username', 'password', sequelizeOpts);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    const res = await sequelize.query(
        sql,
        options
    );
    return res[0];
}


module.exports = {
    // readDatabase,
    sequelizeExecute
};
