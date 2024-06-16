const mysql = require('mysql2');

let pool = null;


const createPool = () => {
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    waitForConnections: true,
    connectionLimit: 200,
    queueLimit: 0
  });
};

createPool(); // Initial creation of the pool

export function executeQuery(query, values = []) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      connection.query(query, values, function (error, results, fields) {
        const [r , f] = [results, fields];
        if (error) {
          reject(error);
        } else {
          pool.releaseConnection(connection);
          resolve([r, f]);
        }
      });
    });
  });
}