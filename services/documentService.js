const db = require('../config/db');

exports.saveDocument = async (file, { type, customer_id, loan_id }) => {
  const [result] = await db.execute(
    'INSERT INTO documents (customer_id, loan_id, file_name, name, type, path) VALUES (?, ?, ?, ?, ?, ?)',
    [
      customer_id,
      loan_id,
      file.originalname,
      file.originalname, // for name column
      type,
      file.path
    ]
  );

  return {
    id: result.insertId,
    customer_id,
    loan_id,
    file_name: file.originalname,
    name: file.originalname,
    type,
    path: file.path
  };
};


exports.storeDocuments = async ({ customer_id, loan_id, documents }) => {
  for (const doc of documents) {
    const type = doc.fieldname; // e.g., "aadhaar", "pan", "gst"
    await this.saveDocument(doc, { type, customer_id, loan_id });
  }
};

exports.getDocumentById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM documents WHERE id = ?', [id]);
  if (rows.length === 0) throw new Error('Document not found');
  return rows[0];
};

exports.getDocumentsByCustomerId = async (customerId) => {
  const [rows] = await db.execute('SELECT * FROM documents WHERE customer_id = ?', [customerId]);
  return rows;
};

exports.deleteDocument = async (id) => {
  await db.execute('DELETE FROM documents WHERE id = ?', [id]);
};
