# 🏦 EasyLoans - SME/MSME Loan Management API

EasyLoans is a modular Node.js + Express.js backend application for managing SME/MSME loan applications. It handles complete lead intake including customer, business, guarantor, loan, and document data in a single multipart/form-data request.

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **Multer** (for file uploads)
- **dotenv**
- **Postman** (for testing APIs)

---

## 📁 Project Structure

```
easyloans/
├── config/
│   └── db.js
├── controllers/
│   └── leadController.js
├── middlewares/
│   ├── errorHandler.js
│   └── fileUpload.js
├── routes/
│   └── leadRoutes.js
├── services/
│   ├── businessService.js
│   ├── customerService.js
│   ├── documentService.js
│   ├── guarantorService.js
│   ├── leadService.js
│   └── loanService.js
├── utils/
│   ├── cibilChecker.js
│   └── fileHelpers.js
├── uploads/
├── .env
├── package.json
└── server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/easyloans.git
cd easyloans
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=easyloans
```

### 4. Start MySQL and Create the Database

```sql
CREATE DATABASE easyloans;
```

Also create required tables: `customers`, `businesses`, `guarantors`, `loans`, `documents`.

### 5. Start the Server

```bash
node server.js
```

---

## 🚀 API Testing (via Postman)

### 1. **Create Lead (multipart/form-data)**

- **POST** `/api/leads`
- **Body Type**: `form-data`
  - **Key**: `lead` | **Type**: `Text` | **Value**: stringified JSON below
  - **Key**: `aadhaar`, `pan`, `gst` | **Type**: `File`

#### Example Lead JSON:
```json
{
  "customer": {
    "first_name": "Akash",
    "last_name": "Verma",
    "email": "akash.verma@example.com",
    "mobile": "9876543210",
    "dob": "1990-01-01",
    "pan_number": "ABCDE1234F",
    "aadhaar_number": "123456789012",
    "cibil_score": 751
  },
  "business": {
    "business_name": "Akash Traders",
    "gst_number": "27ABCDE1234F1Z5",
    "business_type": "Retail",
    "annual_turnover": 1500000
  },
  "guarantor": {
    "mobile": "9988776655",
    "relation_to_applicant": "Brother"
  },
  "loan": {
    "loan_amount": 250000,
    "interest_rate": 10.5,
    "tenure": 24,
    "purpose": "Business Expansion"
  }
}
```

---

## 📄 Endpoints Summary

### 📍 Leads
| Method | Endpoint        | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/leads`     | Create a new lead (with documents) |
| GET    | `/api/leads`     | Get all leads             |
| GET    | `/api/leads/:id` | Get lead by ID            |
| PUT    | `/api/leads/:id` | Update lead by ID         |
| DELETE | `/api/leads/:id` | Delete lead by ID         |

---

## 🔐 CIBIL Score Criteria

- A score **< 650** → Loan Rejected (throws error)
- A score **≥ 650** → Loan Approved

CIBIL score is either user-provided or generated randomly between 500–800 if missing.

---

## 🗂 View Documents

- **GET** `/uploads/<filename>` — View any uploaded document by path.
- **GET** `/api/documents/:id` — Fetch document details by document ID.

---

## 📤 File Uploads

Uploaded files are stored locally in `/uploads/` folder and linked to the corresponding customer and loan.

---

## ✅ How it Works (Process Summary)

1. **User submits 1 multipart/form-data request** with:
   - `lead` JSON in a `Text` field
   - Uploaded Aadhaar, PAN, GST files

2. **Backend Flow:**
   - Parses customer, business, guarantor, loan
   - Validates/generates CIBIL score
   - Approves or rejects loan
   - Stores documents locally
   - Saves all data in MySQL with relations

---

## 📄 License

MIT