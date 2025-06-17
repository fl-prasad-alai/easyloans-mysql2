const getCibilScore = (providedScore) => {
  return providedScore || Math.floor(Math.random() * 300) + 500; // Score between 500-800
};

const validateCibilScore = (score) => {
  if (score < 650) {
    const error = new Error('CIBIL score too low for loan approval');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { getCibilScore, validateCibilScore };
