const guarantorService = require('../services/guarantorService');

// ✅ Create a new guarantor
exports.createGuarantor = async (req, res, next) => {
  try {
    const result = await guarantorService.createGuarantor(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error creating guarantor:', error);
    next(error);
  }
};

// ✅ Get all guarantors
exports.getAllGuarantors = async (req, res, next) => {
  try {
    const guarantors = await guarantorService.getAllGuarantors();
    res.status(200).json(guarantors);
  } catch (error) {
    console.error('❌ Error fetching guarantors:', error);
    next(error);
  }
};

// ✅ Get guarantor by ID
exports.getGuarantorById = async (req, res, next) => {
  try {
    const guarantor = await guarantorService.getGuarantorById(req.params.id);
    if (!guarantor) {
      return res.status(404).json({ error: 'Guarantor not found' });
    }
    res.status(200).json(guarantor);
  } catch (error) {
    console.error('❌ Error fetching guarantor:', error);
    next(error);
  }
};

// ✅ Update guarantor
exports.updateGuarantor = async (req, res, next) => {
  try {
    await guarantorService.updateGuarantor(req.params.id, req.body);
    res.status(200).json({ message: 'Guarantor updated successfully' });
  } catch (error) {
    console.error('❌ Error updating guarantor:', error);
    next(error);
  }
};

// ✅ Delete guarantor
exports.deleteGuarantor = async (req, res, next) => {
  try {
    await guarantorService.deleteGuarantor(req.params.id);
    res.status(200).json({ message: 'Guarantor deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting guarantor:', error);
    next(error);
  }
};
