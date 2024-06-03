import multer from "multer";

const storage = multer.memoryStorage();

module.exports = multer({ storage });
