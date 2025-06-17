const express = require('express');
const router = express.Router();
const guarantorController = require('../controllers/guarantorController');

router.post('/', guarantorController.createGuarantor);
router.get('/', guarantorController.getAllGuarantors);
router.get('/:id', guarantorController.getGuarantorById);
router.put('/:id', guarantorController.updateGuarantor);
router.delete('/:id', guarantorController.deleteGuarantor);

module.exports = router;
