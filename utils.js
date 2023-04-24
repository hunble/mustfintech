
const fs = require('fs').promises;
module.exports = {

//save cookie function
saveCookie : async (page) => {
    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies, null, 2);
    await fs.writeFile('cookies.json', cookieJson);
  },
  
  //load cookie function
  loadCookie : async (page) => {
    const cookieJson = await fs.readFile('cookies.json');
    const cookies = JSON.parse(cookieJson);
    await page.setCookie(...cookies);
  }

};