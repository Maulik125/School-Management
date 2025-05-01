const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", schoolRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/addschool", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "addschool.html"));
});

app.get("/schoollist", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "schoollist.html"));
});

// Route to get all schools
app.get("/api/schoollist", (req, res) => {
  const sql = "SELECT * FROM schools";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("school data does not exits:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
