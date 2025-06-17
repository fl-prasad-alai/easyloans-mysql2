const db = require('../config/db');

// Create a new loan
exports.createLoan = async (data) => {
  const [result] = await db.execute(
    `INSERT INTO loans (
      amount,
      tenure_months,
      interest_rate,
      status,
      customer_id,
      business_id,
      guarantor_id,
      cibil_score
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.amount ?? null,
      data.tenure_months ?? null,
      data.interest_rate ?? null,
      data.status ?? 'pending',
      data.customer_id ?? null,
      data.business_id ?? null,
      data.guarantor_id ?? null,
      data.cibil_score ?? null
    ]
  );
  return { id: result.insertId, ...data };
};

// Get all loans (basic)
exports.getAllLoans = async () => {
  const [rows] = await db.execute('SELECT * FROM loans');
  return rows;
};

// Get all loans with detailed info (used in leadService)
exports.getAllLoansDetailed = async () => {
  const [rows] = await db.query(`
    SELECT 
      loans.*, 
      customers.name AS customer_name,
      businesses.name AS business_name,
      guarantors.name AS guarantor_name
    FROM loans
    JOIN customers ON loans.customer_id = customers.id
    LEFT JOIN businesses ON loans.business_id = businesses.id
    LEFT JOIN guarantors ON loans.guarantor_id = guarantors.id
  `);
  return rows;
};

// Get a loan by ID
exports.getLoanById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM loans WHERE id = ?', [id]);
  return rows[0];
};

// Update a loan
exports.updateLoan = async (id, data) => {
  await db.execute(
    `UPDATE loans 
     SET amount = ?, tenure_months = ?, interest_rate = ?, status = ?
     WHERE id = ?`,
    [
      data.amount ?? null,
      data.tenure_months ?? null,
      data.interest_rate ?? null,
      data.status ?? 'pending',
      id
    ]
  );
};

// Delete a loan
exports.deleteLoan = async (id) => {
  await db.execute('DELETE FROM loans WHERE id = ?', [id]);
};
