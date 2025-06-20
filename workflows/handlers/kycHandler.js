// workflows/handlers/kycHandler.js
const axios = require('axios');

module.exports = async (data, context) => {
  console.log('🔹 Running CKYC handler...');
  const response = await axios.post(
    'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/ckyc/searchAPI/api/data/SearchCKYC',
    { pan: data.pan_number }, // Or pass full object if required by API
    { headers: { 'Content-Type': 'application/json' } }
  );

  const kycStatus = response.data?.status || 'UNKNOWN';
  context.kycStatus = kycStatus;

  return { message: 'KYC fetched', kycStatus };
};
