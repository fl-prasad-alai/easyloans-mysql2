const businessService = require('../services/businessService');

// ✅ Create a new business
exports.createBusiness = async (req, res, next) => {
  try {
    const result = await businessService.createBusiness(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error creating business:', error);
    next(error);
  }
};

// ✅ Get all businesses
exports.getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await businessService.getAllBusinesses();
    res.status(200).json(businesses);
  } catch (error) {
    console.error('❌ Error fetching businesses:', error);
    next(error);
  }
};

// ✅ Get business by ID
exports.getBusinessById = async (req, res, next) => {
  try {
    const business = await businessService.getBusinessById(req.params.id);
    if (!business) {
      return res.status(404).json({ error: 'Business not found' });
    }
    res.status(200).json(business);
  } catch (error) {
    console.error('❌ Error fetching business:', error);
    next(error);
  }
};

// ✅ Update business by ID
exports.updateBusiness = async (req, res, next) => {
  try {
    await businessService.updateBusiness(req.params.id, req.body);
    res.status(200).json({ message: 'Business updated successfully' });
  } catch (error) {
    console.error('❌ Error updating business:', error);
    next(error);
  }
};

// ✅ Delete business by ID
exports.deleteBusiness = async (req, res, next) => {
  try {
    await businessService.deleteBusiness(req.params.id);
    res.status(200).json({ message: 'Business deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting business:', error);
    next(error);
  }
};
