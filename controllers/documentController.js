const documentService = require('../services/documentService');
const path = require('path');

// ✅ Upload and save a document
exports.uploadDocument = async (req, res, next) => {
  try {
    const document = await documentService.saveDocument(req.file, req.body);
    res.status(201).json(document);
  } catch (error) {
    console.error('❌ Error uploading document:', error);
    next(error);
  }
};

// ✅ Get a single document by ID and download it
exports.getDocumentById = async (req, res, next) => {
  try {
    const doc = await documentService.getDocumentById(req.params.id);
    const absolutePath = path.resolve(doc.path);
    res.download(absolutePath, doc.name);
  } catch (error) {
    console.error('❌ Error downloading document:', error);
    next(error);
  }
};

// ✅ Get all documents for a customer — WITH PUBLIC LINK
exports.getDocumentsByCustomer = async (req, res, next) => {
  try {
    const documents = await documentService.getDocumentsByCustomerId(req.params.customerId);

    // Add a direct URL to each document
    const docsWithUrls = documents.map(doc => {
      const fileName = path.basename(doc.path);
      const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${fileName}`;
      return {
        ...doc,
        url: publicUrl
      };
    });

    res.status(200).json(docsWithUrls);
  } catch (error) {
    console.error('❌ Error fetching documents:', error);
    next(error);
  }
};

// ✅ Delete a document
exports.deleteDocument = async (req, res, next) => {
  try {
    await documentService.deleteDocument(req.params.id);
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting document:', error);
    next(error);
  }
};
