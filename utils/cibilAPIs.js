// utils/cibilAPI.js
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
              birthDate: customer.dob || '01011990', // Format: DDMMYYYY
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
              line1: customer.address?.line1 || "123 ABC Road",
              line2: customer.address?.line2 || "Area",
              line3: customer.address?.line3 || "City",
              stateCode: customer.address?.stateCode || "19",
              pinCode: customer.address?.pinCode || "713347",
              addressCategory: "04",
              residenceCode: "01"
            }
          ]
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Assuming CIBIL score is in response.data.score
    return response.data.score || 700; // Fallback if not found
  } catch (error) {
    console.error('❌ Failed to fetch CIBIL score from API:', error.message);
    throw new Error('Unable to retrieve CIBIL score from external API');
  }
};
