// @ts-check
const { test, expect } = require('@playwright/test');
test('login&createAccount', async ({ page }) => {
  await page.goto('http://localhost:8080/parabank');
  
  //log in using username and password
    await page.fill("input[name='username']",'test1');
    await page.fill("input[name='password']",'test1');
    await page.click("input[class='button']");

    //create 3x new accounts 
    await page.click("a[href='/parabank/openaccount.htm']");
    await page.click("input[class='button']");
    await page.click("a[href='/parabank/openaccount.htm']");
    await page.click("input[class='button']");
    await page.click("a[href='/parabank/openaccount.htm']");
    await page.click("input[class='button']");

    //assert the balance
    await page.click("a[href='/parabank/overview.htm']");
    await expect (await page.locator("//b[contains(text(),'$515.50')]")).toHaveText('$515.50');
  });

  test('requestLoan', async ({ page }) => {
    await page.goto('http://localhost:8080/parabank');
    
    //log in using username and password
      await page.fill("input[name='username']",'test1');
      await page.fill("input[name='password']",'test1');
      await page.click("input[class='button']");
  
    //click on request loan
    await page.click("a[href='/parabank/requestloan.htm']");
    await page.fill("input[id='amount']",'5000');
    await page.fill("input[id='downPayment']",'1000');
    await page.click("input[class='button']");
    await expect (await page.locator("//p[contains(text(),'You do not have sufficient funds for the given down payment.')]")).toHaveText('You do not have sufficient funds for the given down payment.');

});


test('paybill', async ({ page }) => {
  //navigate to the browser
  await page.goto('http://localhost:8080/parabank');

  //log in using username and password
  await page.fill("input[name='username']",'test1');
  await page.fill("input[name='password']",'test1');
  await page.click("input[class='button']");

  //pay a bil
  await page.click("a[href='/parabank/billpay.htm']");
  await page.fill("input[name='payee.name']",'keroo');
  await page.fill("input[name='payee.address.street']",'ahmed hmady');
  await page.fill("input[name='payee.address.city']",'alexandria');
  await page.fill("input[name='payee.address.state']",'egypt');
  await page.fill("input[name='payee.address.zipCode']",'25000');
  await page.fill("input[name='payee.phoneNumber']",'01282612160');
  await page.fill("input[name='payee.accountNumber']",'15297');
  await page.fill("input[name='verifyAccount']",'15297');
  await page.fill("input[name='amount']",'1000');

  //asser notification message
  await expect (await page.locator("//h1[contains(text(),'Bill Payment Complete')]")).toHaveText('Bill Payment Complete');
})
