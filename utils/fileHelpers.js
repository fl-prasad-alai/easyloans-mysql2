const path = require('path');
const fs = require('fs');

const ensureUploadsDirExists = () => {
  const uploadPath = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
};

module.exports = {
  ensureUploadsDirExists
};
