const mysql = require('mysql2');

// Create a promise-based pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'krishna@123',
  database: 'simple_login',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export promise version
module.exports = pool.promise();
