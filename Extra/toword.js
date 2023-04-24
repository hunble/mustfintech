const { PDFNet } = require('@pdftron/pdfnet-node');


async function main() {
    const wordOutputOptions = new PDFNet.Convert.WordOutputOptions();
  
    // Optionally convert only the first page
    wordOutputOptions.setPages(1, 1);
  
    // Requires the Structured Output module
    await PDFNet.Convert.fileToWord("out_erdyfygui.pdf", "output_filename", wordOutputOptions);
  }
  PDFNet.runWithCleanup(main);


