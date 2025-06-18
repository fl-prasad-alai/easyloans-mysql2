const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const upload = require('../middlewares/fileUpload');
const multer = require('multer');

router.post('/',upload.any(), leadController.createLead);
router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.put('/:id', leadController.updateLead);
router.delete('/:id', leadController.deleteLead);

module.exports = router;
