const sqlite3 = require("sqlite3").verbose();

// Connect to (or create) the SQLite file
const db = new sqlite3.Database("./mydb.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  brand TEXT,
  modelName TEXT,
  modelYear INT,
  rentPerHour INT,
  image TEXT,
  color TEXT,
  description TEXT,
  carType TEXT,
  transmission TEXT,
  fuelType TEXT,
  mileage TEXT,
  numberOfSeats INT,
  extras TEXT,
  isAvailable BOOLEAN
)`);

module.exports = db;
