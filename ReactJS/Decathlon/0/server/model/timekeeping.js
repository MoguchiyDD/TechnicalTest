const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

db.run(`
  CREATE TABLE IF NOT EXISTS timekeeping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    datetime TEXT
  );
`);

/**
 * Inserts a record into the timekeeping table
 * @param {string} username The username
 * @param {string} datetime The datetime
 * @param {function} callback A callback function, called with (err, id)
 */
const insertData = (username, datetime, callback) => {
  const query = `INSERT INTO timekeeping (username, datetime) VALUES (?, ?)`;
  db.run(query, [username, datetime], function (err) {
    if (err) {
      console.error('Failed to insert data:', err);
      return callback(err);
    }
    callback(null, this.lastID);
  });
};

module.exports = { db, insertData };
