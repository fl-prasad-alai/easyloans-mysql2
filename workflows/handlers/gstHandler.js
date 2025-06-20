// workflows/handlers/gstHandler.js
const axios = require('axios');

module.exports = async (data, context) => {
  console.log('🔹 Running GST handler...');

  const pan = data.pan_number;

  const gstinListRes = await axios.get(
    `https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/pan-search?pan=${pan}`
  );

  const gstin = gstinListRes.data?.gstin?.[0];
  if (!gstin) throw new Error('No GSTIN found');

  const gstDetailsRes = await axios.get(
    `https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/search?gstin=${gstin}`
  );

  context.gstinDetails = gstDetailsRes.data;

  return { message: 'GST details fetched', gstin };
};
