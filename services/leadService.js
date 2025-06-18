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
      console.log('🟢 CIBIL Score:', cibilScore);
    validateCibilScore(cibilScore); // throws error if below threshold

    // 2. Create or fetch Customer
    const customerResult = await customerService.createOrFetchCustomer(customer);
    console.log('🟢 customerResult:', customerResult);

    if (!customerResult || !customerResult.id) throw new Error('Customer creation failed');
    const customerId = customerResult.id;

    // 3. Create Business linked to Customer
    const businessResult = await businessService.createBusiness({
      name: business.business_name,
      type: business.business_type,
      turnover: business.annual_turnover,
      gst_number: business.gst_number,
      customer_id: customerId,
    });

    console.log('🟢 businessResult:', businessResult);
    if (!businessResult || !businessResult.id) throw new Error('Business creation failed');
    const businessId = businessResult.id;

    // 4. Create or Fetch Guarantor
    const guarantorResult = await guarantorService.createOrFetchGuarantor({
      mobile: guarantor?.mobile ?? null,
      relation_to_applicant: guarantor?.relation_to_applicant ?? null,
      customer_id: customerId,
    });
    console.log('🟢 guarantorResult:', guarantorResult);
    if (!guarantorResult || !guarantorResult.id) throw new Error('Guarantor creation failed');

    const guarantorId = guarantorResult.id;

    // 5. Create Loan
    const loanResult = await loanService.createLoan({
  amount: loan.loan_amount ?? null,
  tenure_months: loan.tenure ?? null,
  interest_rate: loan.interest_rate ?? null,
  status: 'approved',
  customer_id: customerId,
  business_id: businessId,
  guarantor_id: guarantorId,
  cibil_score: cibilScore
});
console.log('🟢 loanResult:', loanResult);
if (!loanResult || !loanResult.id) throw new Error('Loan creation failed');

    const loanId = loanResult.id;

 // Step 6: Save Documents
    if (documents && documents.length > 0) {
      console.log(`🟡 Storing ${documents.length} document(s)...`);
      await documentService.storeDocuments({
        customer_id: customerId,
        loan_id: loanId,
        documents,
      });
    } else {
      console.log('⚠️ No documents provided for storage.');
    }

    // Success
    console.log('✅ Loan Application Processed Successfully');
    return { message: 'Loan Application Approved', loanId };

  } catch (error) {
    console.error('❌ Error in createLead:', error.message || error);
    throw error;
  }
};


exports.getAllLeads = async () => {
  try {
    const leads = await loanService.getAllLoansDetailed(); // You must define this in `loanService.js`
    return leads;
  } catch (error) {
    console.error('❌ Error in getAllLeads:', error.message || error);
    throw error;
  }
};
