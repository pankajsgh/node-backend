const db = require('./db');

exports.uploadDocument = (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const sql = `
      INSERT INTO documents (title, file_data)
      VALUES (?, ?)
    `;

    db.query(
      sql,
      [
        title || null,
        req.file.buffer,
      ],
      (err, result) => {
        if (err) {
          console.error('DB ERROR:', err);

          return res.status(500).json({
            success: false,
            error: err.message,
          });
        }

        res.status(200).json({
          success: true,
          id: result.insertId,
        });
      }
    );
  } catch (e) {
    console.error('SERVER ERROR:', e);

    res.status(500).json({
      success: false,
      error: e.message,
    });
  }
};