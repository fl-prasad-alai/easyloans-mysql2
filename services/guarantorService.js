const db = require('../config/db');

// Use mobile to check if guarantor already exists
exports.createOrFetchGuarantor = async (data) => {
  const [rows] = await db.execute('SELECT * FROM guarantors WHERE mobile = ?', [data.mobile]);
  if (rows.length) return rows[0];

  const [result] = await db.execute(
    'INSERT INTO guarantors (mobile, relation_to_applicant,customer_id) VALUES (?, ?, ?)',
    [data.mobile, data.relation_to_applicant, data.customer_id]
  );

  return { id: result.insertId, ...data };
};

exports.getAllGuarantors = async () => {
  const [rows] = await db.execute('SELECT * FROM guarantors');
  return rows;
};

exports.getGuarantorById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM guarantors WHERE id = ?', [id]);
  return rows[0];
};

exports.updateGuarantor = async (id, data) => {
  await db.execute(
    'UPDATE guarantors SET mobile=?, relation_to_applicant=? WHERE id=?',
    [data.mobile, data.relation_to_applicant, id]
  );
};

exports.deleteGuarantor = async (id) => {
  await db.execute('DELETE FROM guarantors WHERE id=?', [id]);
};
