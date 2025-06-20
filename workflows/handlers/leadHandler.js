// workflows/handlers/leadHandler.js
const customerService = require('../../services/customerService');

module.exports = async (data, context) => {
  console.log('🔹 Running lead handler...');
  const customerResult = await customerService.createOrFetchCustomer(data);
  if (!customerResult?.id) throw new Error('Lead creation failed');
  context.customerId = customerResult.id;
  return { message: 'Lead processed', customerId: context.customerId };
};
