const axios = require('axios');

exports.fetchCibilScoreFromAPI = async (customer) => {
  try {
    const response = await axios.post(
      'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/bureau/cibil',
      {
        serviceCode: "CN1CAS0007",
        monitoringDate: "08102020",
        consumerInputSubject: {
          tuefHeader: {
            headerType: "TUEF",
            version: "12",
            memberRefNo: "NB7833",
            gstStateCode: "01",
            enquiryMemberUserId: "NB78338888_CIRC2CNPE",
            enquiryPassword: "Mf4@Eq2#Av8#Jv",
            enquiryPurpose: "10",
            enquiryAmount: "000049500",
            outputFormat: "03",
            responseSize: "1",
            ioMedia: "CC",
            authenticationMethod: "L"
          },
          names: [
            {
              index: "N01",
              firstName: customer.first_name || '',
              middleName: "",
              lastName: customer.last_name || '',
              birthDate: customer.dob || '01011990',
              gender: "1"
            }
          ],
          ids: [
            {
              index: "I01",
              idNumber: customer.pan_number,
              idType: "01"
            }
          ],
          telephones: [
            {
              index: "T01",
              telephoneNumber: customer.mobile,
              telephoneType: "01"
            }
          ],
          addresses: [
            {
              index: "A01",
              line1: customer.address?.line1 || "Line 1",
              line2: customer.address?.line2 || "Line 2",
              line3: customer.address?.line3 || "Line 3",
              stateCode: customer.address?.stateCode || "19",
              pinCode: customer.address?.pinCode || "713347",
              addressCategory: "04",
              residenceCode: "01"
            }
          ]
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return response.data.score || 700;
  } catch (error) {
    console.error('❌ Failed to fetch CIBIL score:', error.message);
    throw new Error('Unable to retrieve CIBIL score');
  }
};


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

