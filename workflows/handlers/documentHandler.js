// workflows/handlers/documentHandler.js
const documentService = require('../../services/documentService');

module.exports = async (data, context) => {
  console.log('🔹 Running document handler...');
  if (!context.documents || context.documents.length === 0) {
    console.log('⚠️ No documents provided.');
    return { message: 'No documents uploaded' };
  }

  await documentService.storeDocuments({
    customer_id: context.customerId,
    loan_id: context.loanId,
    documents: context.documents
  });

  return { message: 'Documents saved' };
};
