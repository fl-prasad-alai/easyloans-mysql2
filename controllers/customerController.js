const customerService = require('../services/customerService');

// ✅ Create a new customer
exports.createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error('❌ Error creating customer:', error);
    next(error);
  }
};

// ✅ Get all customers
exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error('❌ Error fetching customers:', error);
    next(error);
  }
};

// ✅ Get customer by ID
exports.getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('❌ Error fetching customer:', error);
    next(error);
  }
};

// ✅ Update customer
exports.updateCustomer = async (req, res, next) => {
  try {
    await customerService.updateCustomer(req.params.id, req.body);
    res.status(200).json({ message: 'Customer updated successfully' });
  } catch (error) {
    console.error('❌ Error updating customer:', error);
    next(error);
  }
};

// ✅ Delete customer
exports.deleteCustomer = async (req, res, next) => {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting customer:', error);
    next(error);
  }
};
