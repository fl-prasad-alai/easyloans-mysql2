const db = require('../config/db');

exports.createOrFetchCustomer = async (data) => {
  const [rows] = await db.execute('SELECT * FROM customers WHERE mobile = ?', [data.mobile]);
  if (rows.length) return rows[0];

  const [result] = await db.execute(
  'INSERT INTO customers (first_name, last_name, applicant_type, mobile, dob, address) VALUES (?, ?, ?, ?, ?, ?)',
  [
    data.first_name ?? null,
    data.last_name ?? null,
    data.applicant_type ?? null,
    data.mobile ?? null,
    data.dob ?? null,
    data.address ?? null
  ]
);

  return { id: result.insertId, ...data };
};

exports.getAllCustomers = async () => {
  const [rows] = await db.execute('SELECT * FROM customers');
  return rows;
};

exports.getCustomerById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM customers WHERE id = ?', [id]);
  return rows[0];
};

exports.updateCustomer = async (id, data) => {
  await db.execute(
    'UPDATE customers SET first_name=?, last_name=?, applicant_type=?, mobile=? WHERE id=?',
    [data.first_name, data.last_name, data.applicant_type, data.mobile, id]
  );
};

exports.deleteCustomer = async (id) => {
  await db.execute('DELETE FROM customers WHERE id=?', [id]);
};
