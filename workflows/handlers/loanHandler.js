// workflows/handlers/loanHandler.js
const loanService = require('../../services/loanService');

module.exports = async (data, context) => {
  console.log('🔹 Running loan handler...');
  const result = await loanService.createLoan({
    amount: data.loan_amount,
    tenure_months: data.tenure,
    interest_rate: data.interest_rate,
    status: 'approved',
    customer_id: context.customerId,
    business_id: context.businessId ?? null,
    guarantor_id: context.guarantorId ?? null,
    cibil_score: context.cibil_score
  });

  context.loanId = result.id;
  return { message: 'Loan created', loanId: result.id };
};
