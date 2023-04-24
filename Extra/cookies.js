const puppeteer = require("puppeteer");

const utils = require("./utils.js")



const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};



(async () => {


  const start = performance.now();

    
    

  
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: false,
    defaultViewport: false,
    userDataDir: "./tmp",
   });
  const page = await browser.newPage();
  // await utils.loadCookie(page); //load cookie
  await page.goto("https://cloud.eais.go.kr/moct/awp/abb01/AWPABB01F01?returnUrl=%2F", {
    waitUntil: "domcontentloaded", 
    timeout: 0, 
  });

    
  
  console.log(`Execution time: ${(performance.now() - start)/1000} s`);
  



  await page.waitForSelector("#membId", {
    visible: true,
    hidden: false,
  })

  
  await Promise.all([
    page.$eval("#membId", element =>
      element.value = ""
    )
  ]);


  console.log(`found membId: ${(performance.now() - start)/1000} s`);
  

  await page.type("#membId", "sj24sj");


  await page.type(
    "#pwd",
    "sj6154sj!!"
  );

  console.log(`added password: ${(performance.now() - start)/1000} s`);
  

    const checkboxEl = await page.waitForSelector("#membIdSave");
  checkboxEl.click();

  await sleep(5000);
  await page.click(".fl > .loginForm > .btnLogin");


  console.log(`login: ${(performance.now() - start)/1000} s`);

  await page.waitForSelector(".btns > .btnDaum", {
    visible: true,
    hidden: false,
  });


  console.log(`found buttonDaum: ${(performance.now() - start)/1000} s`);

  await page.click(".btns > .btnDaum");


  await Promise.all([
    page.$eval(".btns > .btnDaum", element =>
      element.click()
    )

  ]);

  console.log(`found buttonDaum: ${(performance.now() - start)/1000} s`);

  await sleep(1000);

  console.log(`clicked1: ${(performance.now() - start)/1000} s`);

  await page.waitForSelector("body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button", {
    visible: true,
    hidden: false,
  })


  console.log(`clicked1: ${(performance.now() - start)/1000} s`);



  await Promise.all([
    page.$eval("body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(2) > button", element =>
      element.click()
    ), page.waitForNavigation({waitUntil: 'networkidle2', timeout: 0})
  ]);

  console.log(`clicked1: ${(performance.now() - start)/1000} s`);

  console.log(`password chnage skipped: ${(performance.now() - start)/1000} s`);
  
  await autoScroll(page);


  
  // await page.waitForSelector("#section1 > div > div.mainInner > div.registerUi > div.bldreDiv.bldre1 > a", {
  //   visible: true,
  //   hidden: false,
  // })


  await Promise.all([
    page.$eval("#section1 > div > div.mainInner > div.registerUi > div.bldreDiv.bldre1 > a", element =>
      element.click()
    ),
    page.waitForNavigation({waitUntil: 'networkidle0',timeout:0}),
  ]);

  console.log(`search Page: ${(performance.now() - start)/1000} s`);


  await sleep(10000)

  await Promise.all([
    page.click("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.srchArchitecture > div.searchBuildingWarp > div.AddrSearch > button.btnAddrSrch"),
    page.type("#keyword", "경기도 고양시 일산동구 강석로 152 강촌마을아파트 제701동 제2층 제202호"),
    page.$eval("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.srchArchitecture > div.popAddrSearch > div > div > button", element =>
      element.click()
    ),
    page.$eval("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.srchArchitecture > div.popAddrSearch > div > div.addrList > ul > li > button", element =>
      element.click()
    ),
    page.waitForNavigation({waitUntil: 'networkidle2'}),
    page.$eval("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > ul > li.st2 > a", element =>
      element.click()
    ),
    page.$eval("container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input", element =>
      element.click()
    ),

  ]);


  console.log(`searchbar: ${(performance.now() - start)/1000} s`);

  console.log(`clicked out: ${(performance.now() - start)/1000} s`);

  await sleep(20000);
  //save cookies
  await utils.saveCookie(page); //save cookie

  console.log(`cookies saved: ${(performance.now() - start)/1000} s`);


  // await browser.close();
})();



async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight - window.innerHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}