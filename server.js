const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Utils
const { ensureUploadsDirExists } = require('./utils/fileHelpers');

// Ensure the /uploads directory exists
ensureUploadsDirExists();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses application/json
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data

// Serve static files like uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const leadRoutes = require('./routes/leadRoutes');
const customerRoutes = require('./routes/customerRoutes');
const businessRoutes = require('./routes/businessRoutes');
const guarantorRoutes = require('./routes/guarantorRoutes');
const loanRoutes = require('./routes/loanRoutes');
const documentRoutes = require('./routes/documentRoutes');
const workflowRoutes = require('./routes/workflowRoutes'); // ✅ Dynamic workflow

// API route bindings
app.use('/api/leads', leadRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/guarantors', guarantorRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/workflow', workflowRoutes); // ✅ New dynamic route

// Global error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
