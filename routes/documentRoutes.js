const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const upload = require('../middlewares/fileUpload');

// Upload one document
router.post('/upload', upload.single('document'), documentController.uploadDocument);

// Get document by ID (download)
router.get('/:id', documentController.getDocumentById);

// Get all documents for a customer
router.get('/customer/:customerId', documentController.getDocumentsByCustomer);

// Delete a document
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
