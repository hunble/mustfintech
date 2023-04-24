const puppeteer = require('puppeteer');


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
    slowMo: 100,
   });
  const page = await browser.newPage();

  // Load "https://cloud.eais.go.kr/"
  await page.goto('https://cloud.eais.go.kr/moct/awp/abb01/AWPABB01F01?returnUrl=%2F', {timeout:0});

  // Resize window to 839 x 1057
  await page.setViewport({ width: 839, height: 1057 });

  // Fill "sj6154sj!!" on <input> #pwd
  await page.waitForSelector('#pwd:not([disabled])');
  await page.type('#pwd', "sj6154sj!!");

  // Click on <input> #membId
  await page.waitForSelector('#membId');
  await page.type('#membId', "sj24sj");

  // Click on <input> #pwd
  await page.waitForSelector('#pwd');
  await page.click('#pwd');

  // Click on <button> "로그인"
  await page.waitForSelector('.btnLogin:nth-child(2)');
  await Promise.all([
    page.click('.btnLogin:nth-child(2)'),
    page.waitForNavigation()
  ]);

  // Scroll wheel by X:-2250, Y:0
  await page.evaluate(() => window.scrollBy(-2250, 0));

  // Scroll wheel by X:3000, Y:0
  await page.evaluate(() => window.scrollBy(3000, 0));

  // Click on <button> "다음에 변경하기"
  await page.waitForSelector('.btnDaum');
  await page.click('.btnDaum');

  // Click on <button> "예"
  await page.waitForSelector('.swal-button--confirm');
  await Promise.all([
    page.click('.swal-button--confirm'),
    page.waitForNavigation()
  ]);

  // Fill "sj24sj" on <input> [placeholder="\C791\C131\D55C  \BBFC\C6D0\C774  \B9C8\C774\D398\C774\C9C0\C5D0\C11C  \C548\BCF4\C5EC\C694"]
  // await page.waitForSelector('[placeholder="\C791\C131\D55C  \BBFC\C6D0\C774  \B9C8\C774\D398\C774\C9C0\C5D0\C11C  \C548\BCF4\C5EC\C694"]:not([disabled])');
  // await page.type('[placeholder="\C791\C131\D55C  \BBFC\C6D0\C774  \B9C8\C774\D398\C774\C9C0\C5D0\C11C  \C548\BCF4\C5EC\C694"]', "sj24sj");

  // Scroll wheel by X:0, Y:15000
  await page.evaluate(() => window.scrollBy(0, -25000));

  await sleep(6000);

  // Click on <a> "건축물대장 발급  건축물 대장을 개인정보 동의..."
  await page.waitForSelector('.bldre1 > [href="javascript:void(0)"]');
  await Promise.all([
    page.click('.bldre1 > [href="javascript:void(0)"]'),
    page.waitForNavigation()
  ]);

  console.log(`Search screen: ${(performance.now() - start)/1000} s`);

  await sleep(4000);

  // Click on <button> "도로명주소로 조회"
  await page.waitForSelector('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.srchArchitecture > div.searchBuildingWarp > div.AddrSearch > button.btnAddrSrch');
  await page.click('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.srchArchitecture > div.searchBuildingWarp > div.AddrSearch > button.btnAddrSrch');

  // Click on <input> #keyword
  // await page.waitForSelector('#keyword');
  // await page.click('#keyword');

  // Fill "경기도 고양시 일산동구 강석... on <input> #keyword
  await page.waitForSelector('#keyword:not([disabled])');
  await page.type('#keyword', "경기도 고양시 일산동구 강석로 152 (마두동, 강촌마을7단지아파트)");

  // Click on <button> "조회하기"
  await page.waitForSelector('.formIn > .btnNext');
  await page.click('.formIn > .btnNext');

  console.log(`Find Button: ${(performance.now() - start)/1000} s`);

  // Click on <button> "선택"
  await page.waitForSelector('.addrList button');
  await page.click('.addrList button');

  console.log(`Small Find button: ${(performance.now() - start)/1000} s`);

  await sleep(6000)

  // Click on <a> "일반건축물  1건"
  await page.waitForSelector('.st2 > [href="javascript:;"]');
  await page.click('.st2 > [href="javascript:;"]');

  console.log(`Red Button: ${(performance.now() - start)/1000} s`);

  
    // Click on <input> #ag-212-input
    await page.waitForSelector('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input');
  
  await sleep(6000)

  console.log(`found: ${(performance.now() - start)/1000} s`);
  await page.evaluate

  page.$eval("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input", element =>
    element.click()
  )

  // await page.click('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input');

  // Click on <button> "신청할 민원 담기"
  await page.waitForSelector('#complaintToltal > button');
  await page.click('#complaintToltal > button');

  // Scroll wheel by X:4200, Y:0
  await page.evaluate(() => window.scrollBy(4200, 0));

await sleep(5000)

  // Click on <button> "건축물대장 발급 신청"
  await page.waitForSelector('.btnSubmit');
  await Promise.all([
    page.click('.btnSubmit'),
    page.waitForNavigation()
  ]);

  // Click on <button> "신청하기"
  await page.waitForSelector('.btnNext');
  await Promise.all([
    page.click('.btnNext'),
    page.waitForNavigation()
  ]);

  // Scroll wheel by X:3150, Y:0
  await page.evaluate(() => window.scrollBy(3150, 0));

  // Click on <a> "발급"
  await page.waitForSelector('tr:nth-child(1) [href="javascript:void(0);"]');
  await page.click('tr:nth-child(1) [href="javascript:void(0);"]');

  console.log(`Done: ${(performance.now() - start)/1000} s`);

  await sleep(6000)

  //await browser.close();
})();