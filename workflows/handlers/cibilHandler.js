// workflows/handlers/cibilHandler.js
const { fetchCibilScoreFromAPI } = require('../../utils/apiClients');
const { validateCibilScore } = require('../../utils/cibilChecker');

module.exports = async (data, context) => {
  try {
    console.log('🔹 Running cibil handler...');

    // Fetch score using API
    const score = await fetchCibilScoreFromAPI(data);
    console.log('🟢 CIBIL Score:', score);

    // Validate score (e.g. must be >= 650)
    validateCibilScore(score);

    // Store in context for downstream use
    context.cibil_score = score;

    return { message: 'CIBIL score validated and stored', score };
  } catch (err) {
    console.error('❌ Error in CIBIL handler:', err.message);
    throw err;
  }
};
