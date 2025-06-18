const leadService = require('../services/leadService');

// ✅ Create a new lead (single POST request with all info)
// No need to JSON.parse anything
exports.createLead = async (req, res, next) => {
  try {
    if (!req.body || !req.body.lead) {
      return res.status(400).json({ error: 'Missing lead data in request body' });
    }

    let leadData;
    try {
      leadData = JSON.parse(req.body.lead); // lead is stringified JSON
    } catch (parseErr) {
      return res.status(400).json({ error: 'Invalid JSON in lead field' });
    }

    const documents = req.files || [];
    const result = await leadService.createLead({ ...leadData, documents });

    res.status(201).json({ message: 'Loan Application Processed', result });
  } catch (error) {
    console.error('❌ Error creating lead:', error.message);

    // If it's a CIBIL score rejection, respond with 200 and status
    if (
      error.message.includes('CIBIL score too low') ||
      error.message.includes('loan approval')
    ) {
      return res.status(200).json({
        message: 'Loan Rejected due to low CIBIL Score',
        status: 'Rejected',
        reason: error.message,
      });
    }

    res.status(error.statusCode || 500).json({ error: error.message });
  }
};


// ✅ Get all leads
exports.getAllLeads = async (req, res, next) => {
  try {
    const leads = await leadService.getAllLeads();
    res.status(200).json(leads);
  } catch (error) {
    console.error('❌ Error fetching leads:', error.message);
    next(error);
  }
};

// ✅ Get a single lead by ID
exports.getLeadById = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    console.error('❌ Error fetching lead:', error);
    next(error);
  }
};

// ✅ Update lead by ID
exports.updateLead = async (req, res, next) => {
  try {
    await leadService.updateLead(req.params.id, req.body);
    res.status(200).json({ message: 'Lead updated successfully' });
  } catch (error) {
    console.error('❌ Error updating lead:', error);
    next(error);
  }
};

// ✅ Delete lead by ID
exports.deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.params.id);
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting lead:', error);
    next(error);
  }
};
