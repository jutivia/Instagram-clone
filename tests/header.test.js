const puppeteer = require("puppeteer");

let page, browser;
beforeEach(async () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
});

// test("We launch a browser", async () => {
//   await page.goto("localhost:3000");
//   const text = await page.$eval("button.google-sign", (el) => el.innerHTML);
//   console.log(text);
//   expect(text).toEqual("Sign up with Google");
// });
test('We can click login to input our email ', async () => {
    const text = await page.$eval("button.email-signup", (el) => el.innerHTML);
    console.log(text)
    expect(text).toEqual("Sign up with your email");
})

afterEach(async () => {
  await browser.close();
});
