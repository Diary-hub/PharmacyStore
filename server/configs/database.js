const { createPool } = require("mysql");

const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "admin1234admin",
  database: "pharmacy",
});

module.exports = pool;
