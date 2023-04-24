const Recipe = require('muhammara').Recipe;

const pdfDoc = new Recipe("demo_123.pdf", "output_tast2.pdf");
const longPDF = "./demo_123.pdf";

pdfDoc
  // just page 10
  .appendPage(longPDF, 1)
  // page 4 and page 6
  .appendPage(longPDF, [1, 2])
  // page 1-3 and 6-20
  .appendPage(longPDF, [
    [1, 2],
    [2, 1],
  ])
  .appendPage(longPDF)
  .endPDF();