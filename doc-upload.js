const db = require('./db');

// ================= upload doc =================
exports.uploadDocument = (req, res) => {
  const { title } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded',
    });
  }

  const sql = `
    INSERT INTO documents
    (title, file_data)
    VALUES (?, ?)
  `;

  db.query(
    sql,
    [
      title,
      req.file.buffer,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }

      res.json({
        success: true,
        id: result.insertId,
      });
    }
  );
};