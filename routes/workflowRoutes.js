const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');
const multer = require('multer');
const path = require('path');

// File Upload Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ POST /api/workflow/run
router.post('/run', upload.any(), workflowController.runWorkflow);

module.exports = router;
