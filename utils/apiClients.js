const axios = require('axios');

// CKYC Search
exports.searchCKYC = async(payload) => {
  const url = 'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/ckyc/searchAPI/api/data/SearchCKYC';
  const {data} = await axios.post(url,payload,{
    headers:{'Content-Type':'application/json'}
  });
  return data;
}

//GSTIN by PAN
exports.getGSTINsByPAN = async(pan) =>{
  const url = `https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/pan-search?pan=${pan}`;
  const{data} = await axios.get(url);
  return data;
};

// GSTIN details
exports.getGSTINDetails = async(gstin) => {
  const url = `https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/search?gstin=${gstin}`;
  const{data} = await axios.get(url);
  return data;
};

