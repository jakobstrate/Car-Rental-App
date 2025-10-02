const cors = require("cors")
const express = require("express");

const db = require("./db");

const app = express();
const PORT = 3000;


app.use(cors({ origin: "http://localhost:8081" }));


app.use(
  express.json());

app.use("/assets",express.static('assets'));

app.get("/cars", (req, res) => {
  db.all("SELECT * FROM cars", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ cars: rows });
  });
});
 
app.post("/cars", (req, res) => {
  const {
  brand,
  modelName,
  modelYear,
  rentPerHour,
  image,
  color,
  description,
  carType,
  transmission,
  fuelType,
  mileage,
  numberOfSeats,
  extras,
  isAvailable,
} = req.body;
  db.run(
    `INSERT INTO cars (brand,
  modelName,
  modelYear,
  rentPerHour,
  image,
  color,
  description,
  carType,
  transmission,
  fuelType,
  mileage,
  numberOfSeats,
  extras,
  isAvailable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
  brand,
  modelName,
  modelYear,
  rentPerHour,
  image,
  color,
  description,
  carType,
  transmission,
  fuelType,
  mileage,
  numberOfSeats,
  extras,
  isAvailable,
],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID,
  brand,
  modelName,
  modelYear,
  rentPerHour,
  image,
  color,
  description,
  carType,
  transmission,
  fuelType,
  mileage,
  numberOfSeats,
  extras,
  isAvailable,
 });
    }
  );
});

app.get("/cars/:id", (req, res) => {
  db.get("SELECT * FROM cars WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(row);
  });
});
app.put("/cars/image", (req, res) => {
  const {id, image} = req.body
  db.run(`UPDATE cars SET image = ? WHERE id = ?`, [image, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json("Table updated successfully");
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
