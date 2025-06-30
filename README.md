# 🏦 EasyLoans - A MSME/SME Loan Management API System

**EasyLoans** is a modular backend system for managing SME/MSME loan applications. Built using **Node.js**, **Express.js**, and **MySQL2**, the system captures & integrates customer, business, guarantor, loan, and document data in a single API request. It also validates CIBIL eligibility and stores uploaded documents locally.

Tested and debugged using **Postman**, the system is designed to be modular, reliant , extensible, and developer-friendly.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL2** (via XAMPP/MySQL server)
- **Multer** (for file uploads)
- **dotenv**
- **Thunderclient**
- **Postman** - for API testing

---

## 📁 Project Structure

easyloans/
├── config/
│ └── db.js # MySQL database connection
├── controllers/ # Handles HTTP request logic
│ ├── businessController.js
│ ├── customerController.js
│ ├── documentController.js
│ ├── guarantorController.js
│ ├── leadController.js
│ └── loanController.js
├── middlewares/
│ ├── errorHandler.js # A Global error handling
│ └── fileUpload.js # A Multer config for document uploads
├── routes/ # API endpoints
│ ├── businessRoutes.js
│ ├── customerRoutes.js
│ ├── documentRoutes.js
│ ├── guarantorRoutes.js
│ ├── leadRoutes.js
│ └── loanRoutes.js
├── services/ # Business logic and DB interactions
│ ├── businessService.js
│ ├── customerService.js
│ ├── documentService.js
│ ├── guarantorService.js
│ ├── leadService.js
│ └── loanService.js
├── utils/
│ ├── cibilChecker.js # Dummy/Real CIBIL eligibility logic
│ └── fileHelpers.js # Ensures upload folder exists
├── uploads/ # Folder for storing uploaded documents
├── .env # Environment variables
├── package.json
├── server.js
└── README.md
---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/easyloans.git
cd easyloans
2. Install Dependencies
```bash
npm install

3. Setup MySQL Database
Create a database called easyloans_db in MySQL (via XAMPP/CLI).

Update your .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=easyloans_db
PORT=3000

4. Start the Server
bash
Copy
Edit
node server.js
You should see:

arduino
Copy
Edit
✅ Server running on http://localhost:3000
📄 API Overview
All endpoints are prefixed with /api.

📍 Leads
Method	Endpoint	Description
POST	/api/leads	Create a new loan application
GET	/api/leads	Get all loan applications
GET	/api/leads/:id	Get a specific lead by ID
PUT	/api/leads/:id	Update a lead by ID
DELETE	/api/leads/:id	Delete a lead by ID

📍 Customers / Business / Guarantors / Documents
Entity	Endpoint	Description
Customers	/api/customers/:id	Get, update or delete customer
Business	/api/businesses/:id	Same as above
Guarantors	/api/guarantors/:id	Same as above
Documents	/api/documents/:id	Download documents by ID

📤 Example Lead Submission via Postman
Use POST /api/leads with form-data:

Key	Type	Description
lead	Text	Stringified JSON (see below)
documents	File	Upload Aadhaar, PAN, GST, etc. (multi)

Sample lead field value:
json
Copy
Edit
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "address": "Bangalore"
  },
  "business": {
    "name": "Doe Enterprises",
    "type": "Retail",
    "annual_turnover": 1500000
  },
  "guarantor": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "1234567890",
    "relation": "Spouse"
  },
  "loan": {
    "amount": 500000,
    "tenure_months": 24,
    "interest_rate": 12.5
  }
}
🗂️ File Uploads
Uploaded files are stored locally in the uploads/ directory and linked to their associated customer ID. You can view them using:

bash
Copy
Edit
GET /uploads/<filename>
🧪 Testing with Postman
Open Postman

Use the POST /api/leads endpoint

In Body → form-data, add:

Key: lead → Type: Text → Paste JSON

Key: documents → Type: File → Upload Aadhaar, PAN, etc.

📄 License
This project is licensed under the MIT License.

vbnet
Copy
Edit

Let me know if you'd like a downloadable `.md` file or want this adapted for a GitHub Pages site!






