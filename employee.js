const db = require('./db');
exports.getEmployees = (req, res) => {
  const search = req.query.search?.trim();

  console.log("SEARCH =", search);

  let sql = `
    SELECT *
    FROM employees
  `;

  let params = [];

  if (search) {
    sql += `
      WHERE LOWER(name) LIKE ?
         OR LOWER(role) LIKE ?
         OR LOWER(department) LIKE ?
    `;

    const value = `%${search.toLowerCase()}%`;
    params = [value, value, value];
  }

  console.log("SQL =", sql);
  console.log("PARAMS =", params);

  db.query(sql, params, (err, results) => {
    console.log("COUNT =", results?.length);

    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  });
};

// ================= CREATE EMPLOYEE =================
exports.createEmployee = (req, res) => {
  const { name, role, department, color } = req.body;

  if (!name || !role || !department || !color) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO employees (name, role, department, color)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, role, department, color],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Employee created",
        id: result.insertId,
      });
    }
  );
};