const express = require('express');
const puppeteer = require('puppeteer-extra');
const fs = require("fs");
const https = require('https');

// import fs from "fs";
// import puppeteer from "puppeteer-extra";
// import express from "express";

// const PuppeteerNetworkMonitor = require("./utils/PuppeteerNetworkMonitor.js")


const app = express();

// On top of your code
const cache = {};

puppeteer.use(require('puppeteer-extra-plugin-user-preferences')({userPrefs: {
  download: {
    prompt_for_download: false,
    open_pdf_in_system_reader: true
  },
  plugins: {
    always_open_pdf_externally: true // this should do the trick
  }
}}));

let browser, page;


const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


app.get('/start-browser', async function (req, res) {
  
  const start = performance.now();
  
  
  browser = await puppeteer.launch({ 
    headless: false,
    devtools: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  page = await browser.newPage();
  
  await page.setRequestInterception(true);
  
  page.on('request', async(request) => {
    
    if(request.resourceType() === 'image' || request.resourceType() === 'font'){
      request.abort();
    } else {
      const url = request.url();
      if (cache[url] && cache[url].expires > Date.now()) {
          console.log("cache hit")
          await request.respond(cache[url]);
          return;
      } else {
        // console.log("requesting "+request.resourceType() +" -> "+ request.url())
      }
      request.continue();
    }
  });

  page.on('response', async(response) => {
    const url = response.url();
    const headers = response.headers();
    const cacheControl = headers['cache-control'] || '';
    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    var maxAge = maxAgeMatch && maxAgeMatch.length > 1 ? parseInt(maxAgeMatch[1], 10) : 0;

    if (response.request().resourceType() == "script" || response.request().resourceType() == "stylesheet") {
      maxAge = 10000
    }

    if (maxAge) {
        // if (!cache[url] || cache[url].expires > Date.now()) return;
        
        let buffer;
        try {
            buffer = await response.buffer();
        } catch (error) {
            // some responses do not contain buffer and do not need to be catched
            return;
        }
    
        cache[url] = {
            status: response.status(),
            headers: response.headers(),
            body: buffer,
            expires: Date.now() + (maxAge * 1000),
        };
    }
});


  console.log(`Login screen: ${(performance.now() - start)/1000} s`);
  
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

// 
  // sleep(3000000)
  
  // Click on <button> "로그인"
  await page.waitForSelector('#container > div.content.pb80 > div > div > div.fl > div.loginForm > button');
  await Promise.all([
    page.click('#container > div.content.pb80 > div > div > div.fl > div.loginForm > button'),
    page.waitForNavigation()
  ]);
  
  console.log(`Login Success: ${(performance.now() - start)/1000} s`);

  // Scroll wheel by X:-2250, Y:0
  await page.evaluate(() => window.scrollBy(-2250, 0));
  
  // Scroll wheel by X:3000, Y:0
  await page.evaluate(() => window.scrollBy(3000, 0));
  
  await sleep(2000);
  
  // Click on <button> "다음에 변경하기"
  await page.waitForSelector('.btnDaum');
  await page.click('.btnDaum');
  
  
  await sleep(2000);
  
  console.log(`Password skip: ${(performance.now() - start)/1000} s`);

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

  console.log(`Ledge screen: ${(performance.now() - start)/1000} s`);
  
  // Click on <a> "건축물대장 발급  건축물 대장을 개인정보 동의..."
  await page.waitForSelector('.bldre1 > [href="javascript:void(0)"]');
  await Promise.all([
    page.click('.bldre1 > [href="javascript:void(0)"]'),
    page.waitForNavigation()
  ]);
  
  console.log(`Search screen: ${(performance.now() - start)/1000} s`);
  console.log(`Ready done: ${(performance.now() - start)/1000} s`);
  
  
  res.end('Browser started');
});


async function downloadFiles(url, count) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  for (let i = 0; i < count; i++) {
    const pageUrl = await url(i);
    try {
      await page.goto(pageUrl);
      await page.pdf({
        path: `pdf-${i}.pdf`,
        format: 'A4',
        printBackground: true
      });
    } catch (e) {
      console.log(`Error loading ${pageUrl}`);
    }
  }
  await browser.close();
}



app.get('/run', async function (req, res) {
  
  const start = performance.now();
  
  browser.on('targetcreated', async (target) => {

    console.log(target.url());


});
  
  console.log(`New Search Request done: ${(performance.now() - start)/1000} s`);
  
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
  console.log(`Small Find button: ${(performance.now() - start)/1000} s`);
  
  
  await page.click('.addrList button'),
  await sleep(3000)
  
  // await Promise.all([
  //   await page.click('.addrList button'),
  //   await waitForNetworkIdle(page, 3000, maxInflightRequests = 0)
  // ]);
  
  
  // Click on <a> "일반건축물  1건"
  await page.waitForSelector('.st2 > [href="javascript:;"]');
  
  await page.click('.st2 > [href="javascript:;"]');
  
  console.log(`Red Button: ${(performance.now() - start)/1000} s`);
  
  
  // Click on <input> #ag-212-input
  await page.waitForSelector('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input');
  
  console.log(`found: ${(performance.now() - start)/1000} s`);
  await page.evaluate
  
  page.$eval("#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input", element =>
  element.click()
  )

  console.log(`Checkbox: ${(performance.now() - start)/1000} s`);
  
  // await page.click('#container > div.content.clearFix > div > div.floatWarp.mt30.clearFix > div.contLeft > div.mt20.clearFix > div > div:nth-child(2) > table > tbody > div > div > div.ag-root-wrapper-body.ag-layout-normal.ag-focus-managed > div.ag-root.ag-unselectable.ag-layout-normal > div.ag-body-viewport.ag-layout-normal.ag-row-no-animation > div.ag-center-cols-clipper > div > div > div > div:nth-child(1) > div > div > div > div.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper > input');
  
  // Click on <button> "신청할 민원 담기"
  await page.waitForSelector('#complaintToltal > button');
  await page.click('#complaintToltal > button');
  // Scroll wheel by X:4200, Y:0
  // await page.evaluate(() => window.scrollBy(4200, 0));
  
  await sleep(3000)
  
  console.log(`Add Complaint: ${(performance.now() - start)/1000} s`);

  // Click on <button> "건축물대장 발급 신청"
  await page.waitForSelector('.btnSubmit');
  await Promise.all([
    page.click('.btnSubmit'),
    page.waitForNavigation()
  ]);
  
  await sleep(4000)
  
  console.log(`Submitted: ${(performance.now() - start)/1000} s`);

  // Click on <button> "신청하기"
  await page.waitForSelector('.btnNext');
  await Promise.all([
    page.click('.btnNext'),
    page.waitForNavigation()
  ]);
  
  console.log(`Next screen: ${(performance.now() - start)/1000} s`);

  // Scroll wheel by X:3150, Y:0
  await page.evaluate(() => window.scrollBy(3150, 0));
  
  await sleep(2000)
  
  
  // Click on <a> "발급"
  await page.waitForSelector('tr:nth-child(1) [href="javascript:void(0);"]');
  // await page.click('tr:nth-child(1) [href="javascript:void(0);"]');



  await clickAndWaitForTarget('tr:nth-child(1) [href="javascript:void(0);"]', page, browser)

  console.log(`Download link: ${(performance.now() - start)/1000} s`);

  console.log(`Done: ${(performance.now() - start)/1000} s`);
  
  await page.goBack();
  await sleep(2000);
  await page.goBack();
  
  console.log(`Ready Again: ${(performance.now() - start)/1000} s`);

  res.end('Done.'); // You could also return results here
});


let clickAndWaitForTarget = async (clickSelector, page, browser) => {
  const pageTarget = page.target();
  await page.click(clickSelector);
  try {
    const newTarget = await browser.waitForTarget(
      target => target.opener() === pageTarget,
      { timeout: 3000} /*3 seconds instead*/
    );
    const newPage = await newTarget.page(); //get the page object
    await page.waitFor(10000); 
    return newPage;
  } catch {
    return null;
  }
};

function waitForNetworkIdle(page, timeout, maxInflightRequests = 0) {
  page.on('request', onRequestStarted);
  page.on('requestfinished', onRequestFinished);
  page.on('requestfailed', onRequestFinished);
  
  let inflight = 0;
  let fulfill;
  let promise = new Promise(x => fulfill = x);
  let timeoutId = setTimeout(onTimeoutDone, timeout);
  return promise;
  
  function onTimeoutDone() {
    console.log(`Timeout ${timeout}`)
    page.removeListener('request', onRequestStarted);
    page.removeListener('requestfinished', onRequestFinished);
    page.removeListener('requestfailed', onRequestFinished);
    fulfill();
  }
  
  function onRequestStarted() {
    ++inflight;
    if (inflight > maxInflightRequests)
    clearTimeout(timeoutId);
  }
  
  function onRequestFinished() {
    if (inflight === 0)
    return;
    --inflight;
    if (inflight === maxInflightRequests)
    timeoutId = setTimeout(onTimeoutDone, timeout);
  }
}


app.listen(3000);