const loanService = require('../services/loanService');

// ✅ Create a new loan
exports.createLoan = async (req, res, next) => {
  try {
    const result = await loanService.createLoan(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error creating loan:', error);
    next(error);
  }
};

// ✅ Get all loans
exports.getAllLoans = async (req, res, next) => {
  try {
    const loans = await loanService.getAllLoans();
    res.status(200).json(loans);
  } catch (error) {
    console.error('❌ Error fetching loans:', error);
    next(error);
  }
};

// ✅ Get loan by ID
exports.getLoanById = async (req, res, next) => {
  try {
    const loan = await loanService.getLoanById(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error('❌ Error fetching loan:', error);
    next(error);
  }
};

// ✅ Update loan
exports.updateLoan = async (req, res, next) => {
  try {
    await loanService.updateLoan(req.params.id, req.body);
    res.status(200).json({ message: 'Loan updated successfully' });
  } catch (error) {
    console.error('❌ Error updating loan:', error);
    next(error);
  }
};

// ✅ Delete loan
exports.deleteLoan = async (req, res, next) => {
  try {
    await loanService.deleteLoan(req.params.id);
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting loan:', error);
    next(error);
  }
};
