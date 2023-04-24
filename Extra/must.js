const fs = require("fs");
const utils = require("./utils.js")
const puppeteer = require("puppeteer");


(async () => {

    const start = performance.now();

    
    
    

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });

  const page = await browser.newPage();
    await utils.loadCookie(page); //load cookie
  await page.goto(
    "https://cloud.eais.go.kr/moct/bci/aaa02/BCIAAA02L01", {timeout: 0,  waitUntil: 'domcontentloaded'}
    

  );

   
//  console.log(page)





console.log(`Execution time: ${(performance.now() - start)/1000} s`);



})();


