const {sequelizeExecute} = require('../util')
// const sequelize = require('@/utils/sequelize.js')
module.exports = {

    getPageBySql: function (req, res) {
        return new Promise(async (resolve, reject) => {
            try {
                const params = req.body
                const {
                    filterKey, filterValue, pageNum, pageSize, tableName, sql: filterSql
                } = params;
                const [{total = 1}] = await sequelizeExecute(params.dataBase, `SELECT COUNT(*) as total FROM :tableName ` + filterSql, {
                    replacements: {
                        tableName, filterValue
                    }
                });

                const sql = `SELECT * FROM :tableName ` + filterSql + ` LIMIT :pageStart,:pageSize`;
                const records = await sequelizeExecute(params.dataBase, sql, {
                    replacements: {
                        pageStart: (pageNum - 1) * pageSize, tableName, filterKey, filterValue, pageSize
                    }
                });
                res.status(200);
                res.json({
                    code: 200, message: null, data: {
                        records, total
                    }
                });
            } catch (e) {
                console.log(e);
                res.json({code: 500, message: null, data: null});
            }
        });
    }

}
