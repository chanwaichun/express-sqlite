const {Sequelize} = require("sequelize");
const sequlizeMap = {}

async function sequelizeExecute(
    dataBase,
    sql,
    options
) {
    if (!sequlizeMap[dataBase]) {
        let sequelizeOpts = {
            host: 'localhost', dialect: 'sqlite', storage: dataBase

        }
// sequelizeOpts.dialectModule = sqlite3
        const sequelize = new Sequelize('database', 'username', 'password', sequelizeOpts);
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
        sequlizeMap[dataBase] = sequelize
    }

    const res = await sequlizeMap[dataBase].query(
        sql,
        options
    );
    return res[0];
}


module.exports = {
    // readDatabase,
    sequelizeExecute
};
