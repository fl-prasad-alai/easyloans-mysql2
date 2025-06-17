const db = require('../config/db');

exports.createBusiness = async (data) => {
  const [result] = await db.execute(
    'INSERT INTO businesses (name, type, turnover, customer_id) VALUES (?, ?, ?, ?)',
    [data.name, data.type, data.turnover, data.customer_id]
  );
  return { id: result.insertId, ...data };
};

exports.getAllBusinesses = async () => {
  const [rows] = await db.execute('SELECT * FROM businesses');
  return rows;
};

exports.getBusinessById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM businesses WHERE id = ?', [id]);
  return rows[0];
};

exports.updateBusiness = async (id, data) => {
  await db.execute(
    'UPDATE businesses SET name=?, type=?, turnover=? WHERE id=?',
    [data.name, data.type, data.turnover, id]
  );
};

exports.deleteBusiness = async (id) => {
  await db.execute('DELETE FROM businesses WHERE id=?', [id]);
};
