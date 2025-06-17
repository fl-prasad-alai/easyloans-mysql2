const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const upload = require('../middlewares/fileUpload');

router.post('/', leadController.createLead);
router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
