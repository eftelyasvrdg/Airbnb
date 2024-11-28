const sql = require('mssql');


const config = {
  user: 'eftelyasvrdg',
  password: 'Fidansu236',
  server: 'project4458.database.windows.net',
  database: 'Airbnb', //dön buna
  options: {
    encrypt: true, 
    enableArithAbort: true,
  },
};
   

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to Azure SQL Database');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed', err);
  });

module.exports = {
  sql,
  poolPromise,
};
