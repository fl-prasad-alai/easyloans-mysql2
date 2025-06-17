const customerService = require('./customerService');
const businessService = require('./businessService');
const guarantorService = require('./guarantorService');
const loanService = require('./loanService');
const documentService = require('./documentService');
const { getCibilScore, validateCibilScore } = require('../utils/cibilChecker');

exports.createLead = async (leadData) => {
  try {
    const { customer, business, guarantor, loan, documents } = leadData;

    // 1. Use passed CIBIL score or fallback (dev mode)
    const cibilScore = getCibilScore(customer?.cibil_score ?? null);
    validateCibilScore(cibilScore); // throws error if below threshold

    // 2. Create or fetch Customer
    const customerResult = await customerService.createOrFetchCustomer(customer);
    const customerId = customerResult.id;

    // 3. Create Business linked to Customer
    const businessResult = await businessService.createBusiness({
      ...business,
      customer_id: customerId,
    });
    const businessId = businessResult.id;

    // 4. Create or Fetch Guarantor
    const guarantorResult = await guarantorService.createOrFetchGuarantor({
      mobile: guarantor?.mobile ?? null,
      relation_to_applicant: guarantor?.relation_to_applicant ?? null,
      customer_id: customerId,
    });
    const guarantorId = guarantorResult.id;

    // 5. Create Loan
    const loanResult = await loanService.createLoan({
      ...loan,
      tenure_months: loan?.tenure ?? null,
      customer_id: customerId,
      business_id: businessId,
      guarantor_id: guarantorId,
      cibil_score: cibilScore,
      status: 'approved',
    });
    const loanId = loanResult.id;

    // 6. Store Documents
    await documentService.storeDocuments({
      customer_id: customerId,
      loan_id: loanId,
      documents,
    });

    return { message: 'Loan Application Approved', loanId };
  } catch (error) {
    throw error;
  }
};

exports.getAllLeads = async () => {
  try {
    const leads = await loanService.getAllLoansDetailed(); // You must define this in `loanService.js`
    return leads;
  } catch (error) {
    throw error;
  }
};
