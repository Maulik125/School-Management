const db = require('../config/db');
const { calculateDistance } = require('../utils/distance');

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'School added successfully' });
  });
};

exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLong = parseFloat(req.query.longitude);
  if (isNaN(userLat) || isNaN(userLong)) {
    return res.status(400).json({ message: 'Invalid coordinates' });
  }

  db.query('SELECT * FROM schools', (err, schools) => {
    if (err) return res.status(500).json({ error: err });

    schools.forEach(school => {
      school.distance = calculateDistance(userLat, userLong, school.latitude, school.longitude);
    });

    schools.sort((a, b) => a.distance - b.distance);
    res.json(schools);
  });
};
