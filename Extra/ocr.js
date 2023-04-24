require('dotenv').config();                           // To load executable paths from .env file
const PdfOcr = require('node-pdf-ocr');

PdfOcr('out_erdtfygui.pdf', {language: "kor"})
  .then((text) => console.log(text))
  .catch((err) => console.error(err));