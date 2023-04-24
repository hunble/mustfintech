
// import translate from "translate";
import { degrees, PDFDocument, rgb, StandardFonts, grayscale } from 'pdf-lib';
import {writeFileSync,readFileSync} from "fs";

// translate.engine = "deepl";
// translate.key = process.env.DEEPL_KEY;


import PDFParser from "pdf2json";

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfData)

    modifyPdf(pdfData.Pages[0].Texts, pdfData.Pages[0].Height, pdfData.Pages[0].Width)

    // fs.writeFile("F1040EZ.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("demo_123.pdf");


const generateRandomString = (myLength) => {
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    { length: myLength },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
};


// 👇️ mark as async
async function getTrnalation(text) {

  console.log(text)

  let trans = decodeURI(text)


  // const trans = await translate(text, { to: "es", form: "kr" });
  // console.log(trans);
  const maximum = 5
  const minimum = 2

  var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  if (text != "%E2%96%A0") {
    return trans
  }
  return "o"
}





async function modifyPdf(items, h, w) {


  try {
    const pdfData = readFileSync("./demo_123.pdf");
  
    const pdfDoc = await PDFDocument.load(pdfData)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    var { width, height } = firstPage.getSize()
    height = height - 15
    for (const index in items) {
      var item = items[index]
      // console.log(item.R[0].T)

      const x = (item.x/w) * width;
      const y = height - ((item.y/h) * height);

      firstPage.drawRectangle({
        x: x,
        y: y,
        width: 10,
        height: 10,
        color: rgb(1, 1, 1),
      })
  
      firstPage.drawText(index, {
        x: x,
        y: y,
        size: 10,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        background: rgb(0.95, 0.1, 0.1),
      })


    }

  
    const pdfBytes = await pdfDoc.save()

    writeFileSync('output_task3.pdf',pdfBytes)

  } catch (err) {
    console.error(err);
  }


}