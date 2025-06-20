// services/workflowService.js

const leadService = require('./leadService');
const businessService = require('./businessService');
const loanService = require('./loanService');
const documentService = require('./documentService');
const customerService = require('./customerService');
const guarantorService = require('./guarantorService');

const { validateCibilScore } = require('../utils/cibilChecker');
const {
  fetchCibilScoreFromAPI,
  searchCKYC,
  getGSTINsByPAN,
  getGSTINDetails
} = require('../utils/apiClients');

exports.run = async (workflowSteps, data, documents) => {
  const context = {}; // Shared data between steps

  for (const step of workflowSteps) {
    switch (step) {
      case 'lead': {
        const customer = data.lead;
        console.log('▶️ Creating customer...');
        const result = await customerService.createOrFetchCustomer(customer);
        if (!result?.id) throw new Error('Lead step failed: Could not create customer');
        context.customer_id = result.id;
        context.pan_number = customer.pan_number;
        context.lead_data = customer;
        break;
      }

      case 'business': {
        console.log('▶️ Creating business...');
        const business = data.business;
        const result = await businessService.createBusiness({
          ...business,
          customer_id: context.customer_id
        });
        if (!result?.id) throw new Error('Business step failed');
        context.business_id = result.id;
        break;
      }

      case 'guarantor': {
        console.log('▶️ Creating guarantor...');
        const guarantor = data.guarantor;
        const result = await guarantorService.createOrFetchGuarantor({
          ...guarantor,
          customer_id: context.customer_id
        });
        if (!result?.id) throw new Error('Guarantor step failed');
        context.guarantor_id = result.id;
        break;
      }

      case 'cibil': {
        console.log('▶️ Fetching CIBIL score...');
        const customer = context.lead_data || data.lead;
        const score = await fetchCibilScoreFromAPI(customer);
        validateCibilScore(score);
        context.cibil_score = score;
        break;
      }

      case 'kyc': {
        console.log('▶️ Performing CKYC...');
        const pan = context.pan_number;
        const result = await searchCKYC({ pan });
        context.kyc_status = result?.status || 'not_found';
        break;
      }

      case 'gst': {
        console.log('▶️ Getting GSTIN...');
        const pan = context.pan_number;
        const gstins = await getGSTINsByPAN(pan);
        if (gstins?.length > 0) {
          const details = await getGSTINDetails(gstins[0]);
          context.gst_details = details;
        } else {
          console.warn('⚠️ No GSTINs found for PAN:', pan);
        }
        break;
      }

      case 'loan': {
        console.log('▶️ Creating loan...');
        const loan = data.loan;
        const result = await loanService.createLoan({
          ...loan,
          customer_id: context.customer_id,
          business_id: context.business_id,
          guarantor_id: context.guarantor_id,
          cibil_score: context.cibil_score ?? null,
          tenure_months: loan?.tenure
        });
        if (!result?.id) throw new Error('Loan step failed');
        context.loan_id = result.id;
        break;
      }

      case 'documents': {
        console.log('▶️ Uploading documents...');
        if (!documents || documents.length === 0) {
          console.warn('⚠️ No documents provided');
          break;
        }
        await documentService.storeDocuments({
          customer_id: context.customer_id,
          loan_id: context.loan_id,
          documents
        });
        break;
      }

      default:
        throw new Error(`❌ Unknown workflow step: ${step}`);
    }
  }

  console.log('✅ Workflow executed successfully');
  return context;
};
