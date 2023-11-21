// const fs = require('fs');
//
// const initSqlJs = require('sql.js');
// const {
//     Sequelize
// } = require('sequelize');
//
// async function sqlExecute(
//     sql,
//     params,
//     dataBase
// ) {
//     const filebuffer =
//         fs.readFileSync(dataBase);
//     const SQL = await initSqlJs();
//     const db = new SQL.Database(
//         filebuffer
//     );
//
//     console.log(sql);
//     let stmt = db.prepare(sql);
//     stmt.bind(params);
//     let currentData = [];
//     while (stmt.step()) {
//         let row = stmt.getAsObject();
//         currentData.push(row);
//     }
//     return currentData;
// }
//
// function readDatabase(params = {}) {
//     return new Promise(
//         async (resolve, reject) => {
//             try {
//                 console.log(params);
//                 const {
//                     tableName,
//                     pageNum,
//                     pageSize,
//                     dataBase,
//                     filterKey,
//                     filterValue
//                 } = params;
//
//                 // Load the db
//
//                 const [
//                     { TOTAL: total = 1 }
//                 ] = await sqlExecute(
//                     'SELECT COUNT(*) as TOTAL FROM ' +
//                         tableName,
//                     {},
//                     dataBase
//                 );
//                 const records =
//                     await sqlExecute(
//                         'SELECT * FROM ' +
//                             tableName +
//                             ` WHERE $filterKey = '$filterValue'` +
//                             ' LIMIT ($pageNum -1)*$pageSize,$pageSize',
//                         {
//                             $pageNum:
//                                 pageNum ||
//                                 1,
//                             $pageSize:
//                                 pageSize ||
//                                 10,
//                             $tableName:
//                                 tableName,
//                             $filterKey:
//                                 filterKey,
//                             $filterValue:
//                                 filterValue
//                         },
//                         dataBase,
//                         params
//                     );
//                 resolve({
//                     records,
//                     total
//                 });
//             } catch (e) {
//                 reject(e);
//             }
//         }
//     );
// }
//
// module.exports = {
//     readDatabase
// };
