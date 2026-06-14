const db = require('./db');

// ================= GET + SEARCH =================
exports.getEmployees = (req, res) => {

  const search = req.query.search;

  let sql = "SELECT * FROM employees";
  let params = [];

  if (search) {
    sql += `
      WHERE name LIKE ? 
      OR role LIKE ? 
      OR department LIKE ?
    `;
    const value = `%${search}%`;
    params = [value, value, value];
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  });
};


// ================= CREATE EMPLOYEE =================
exports.createEmployee = (req, res) => {

  const { id, name, role, department, color } = req.body;

  const sql = `
    INSERT INTO employees (id, name, role, department, color)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [id, name, role, department, color], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Employee created",
      insertedId: result.insertId
    });
  });
};