const axios = require('axios');
const customerService = require('./customerService');
const businessService = require('./businessService');
const guarantorService = require('./guarantorService');
const loanService = require('./loanService');
const documentService = require('./documentService');
const { validateCibilScore } = require('../utils/cibilChecker');
const { searchCKYC, getGSTINsByPAN, getGSTINDetails } = require('../utils/apiClients'); // ✅ fixed typo

// ⬇️ Fetch CIBIL score using PAN
const fetchCibilScoreFromAPI = async (pan, firstName, lastName, mobile) => {
  try {
    const payload = {
      serviceCode: 'CN1CAS0007',
      monitoringDate: '08102020',
      consumerInputSubject: {
        tuefHeader: {
          headerType: 'TUEF',
          version: '12',
          memberRefNo: 'NB7833',
          gstStateCode: '01',
          enquiryMemberUserId: 'NB78338888_CIRC2CNPE',
          enquiryPassword: 'Mf4@Eq2#Av8#Jv',
          enquiryPurpose: '10',
          enquiryAmount: '000049500',
          outputFormat: '03',
          responseSize: '1',
          ioMedia: 'CC',
          authenticationMethod: 'L'
        },
        names: [
          {
            index: 'N01',
            firstName,
            middleName: '',
            lastName,
            birthDate: '01011990',
            gender: '1'
          }
        ],
        ids: [
          {
            index: 'I01',
            idNumber: pan,
            idType: '01'
          }
        ],
        telephones: [
          {
            index: 'T01',
            telephoneNumber: mobile,
            telephoneType: '01'
          }
        ],
        addresses: [
          {
            index: 'A01',
            line1: 'Default Address Line 1',
            line2: 'Default Address Line 2',
            line3: 'Default Address Line 3',
            stateCode: '19',
            pinCode: '713347',
            addressCategory: '04',
            residenceCode: '01'
          }
        ]
      }
    };

    const response = await axios.post(
      'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/bureau/cibil',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const score = response?.data?.score || 700;
    console.log('🟢 Fetched CIBIL Score:', score);
    return score;
  } catch (error) {
    console.error('❌ Failed to fetch CIBIL score:', error.message);
    throw new Error('Failed to fetch CIBIL score from API');
  }
};

// ⬇️ Main createLead function
exports.createLead = async (leadData) => {
  try {
    const { customer, business, guarantor, loan, documents } = leadData;

    // 1. Fetch CIBIL Score
    const cibilScore = await fetchCibilScoreFromAPI(
      customer.pan_number,
      customer.first_name,
      customer.last_name,
      customer.mobile
    );
    validateCibilScore(cibilScore);

    // 2. 🔍 Run CKYC Search API
    console.log('🔍 Running CKYC Search...');
    const ckycPayload = {
      name: customer.first_name,
      pan: customer.pan_number,
      mobile: customer.mobile,
      dob: customer.dob || '1990-01-01'
    };
    const ckycResult = await searchCKYC(ckycPayload);
    console.log('🧾 CKYC Search Result:', ckycResult);

    // 3. 🔍 Get GSTINs linked to PAN
    const gstinsByPAN = await getGSTINsByPAN(customer.pan_number);
    console.log('🧾 GSTINs by PAN:', gstinsByPAN);

    // 4. 🔍 Get GSTIN Details
    const gstinDetails = await getGSTINDetails(business.gst_number);
    console.log('🧾 GSTIN Details:', gstinDetails);

    // 5. Create or Fetch Customer
    const customerResult = await customerService.createOrFetchCustomer(customer);
    console.log('🟢 customerResult:', customerResult);
    if (!customerResult?.id) throw new Error('Customer creation failed');
    const customerId = customerResult.id;

    // 6. Create Business
    const businessResult = await businessService.createBusiness({
      name: business.business_name,
      type: business.business_type,
      turnover: business.annual_turnover,
      gst_number: business.gst_number,
      customer_id: customerId,
    });
    console.log('🟢 businessResult:', businessResult);
    if (!businessResult?.id) throw new Error('Business creation failed');
    const businessId = businessResult.id;

    // 7. Create or Fetch Guarantor
    const guarantorResult = await guarantorService.createOrFetchGuarantor({
      mobile: guarantor?.mobile,
      relation_to_applicant: guarantor?.relation_to_applicant,
      customer_id: customerId,
    });
    console.log('🟢 guarantorResult:', guarantorResult);
    if (!guarantorResult?.id) throw new Error('Guarantor creation failed');
    const guarantorId = guarantorResult.id;

    // 8. Create Loan
    const loanResult = await loanService.createLoan({
      amount: loan.loan_amount,
      tenure_months: loan.tenure,
      interest_rate: loan.interest_rate,
      status: 'approved',
      customer_id: customerId,
      business_id: businessId,
      guarantor_id: guarantorId,
      cibil_score: cibilScore,
    });
    console.log('🟢 loanResult:', loanResult);
    if (!loanResult?.id) throw new Error('Loan creation failed');
    const loanId = loanResult.id;

    // 9. Store Documents
    if (documents?.length > 0) {
      console.log(`🟡 Storing ${documents.length} document(s)...`);
      await documentService.storeDocuments({
        customer_id: customerId,
        loan_id: loanId,
        documents,
      });
    } else {
      console.log('⚠️ No documents uploaded.');
    }

    // ✅ Done
    console.log('✅ Loan Application Processed Successfully');
    return { message: 'Loan Application Approved', loanId };
  } catch (error) {
    console.error('❌ Error in createLead:', error.message || error);
    throw error;
  }
};

// Get All Leads
exports.getAllLeads = async () => {
  try {
    const leads = await loanService.getAllLoansDetailed();
    return leads;
  } catch (error) {
    console.error('❌ Error in getAllLeads:', error.message || error);
    throw error;
  }
};
