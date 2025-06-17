const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer'); // ✅ Correct import
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Utils
const { ensureUploadsDirExists } = require('./utils/fileHelpers');

// Ensure uploads directory exists
ensureUploadsDirExists();

// Initialize express app
const app = express();

// Middleware
app.use(cors());

// ✅ Only use express.json() for application/json requests
// It will not interfere with form-data, because multer will be used in that specific route
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Helps parse URL-encoded data

// ✅ Serve static files (like uploaded documents)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const leadRoutes = require('./routes/leadRoutes');
const customerRoutes = require('./routes/customerRoutes');
const businessRoutes = require('./routes/businessRoutes');
const guarantorRoutes = require('./routes/guarantorRoutes');
const loanRoutes = require('./routes/loanRoutes');
const documentRoutes = require('./routes/documentRoutes');

// ✅ API route bindings
app.use('/api/leads', leadRoutes); // <-- your form-data will hit this
app.use('/api/customers', customerRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/guarantors', guarantorRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/documents', documentRoutes);

// Global error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
