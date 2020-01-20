import { LoginPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise } from "protractor";
import { environment } from "../../src/environments/environment";

describe("workspace-project App", () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPage();
    await page.navigateTo();
  });

  it('should display login title', async () => {
    expect(await page.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('user1/password1 should log in successfully to correct initial page', async () => {
    const userName = element(by.id('username'));
    await userName.sendKeys('user1');
    const password = element(by.id('password'));
    await password.sendKeys('password1');
    const loginButton = await element(by.css('.btn-login'));
    await loginButton.click();
    const newUrl = await browser.getCurrentUrl();
    const currentRoles = await browser.driver.executeScript('return window.sessionStorage.getItem("currentRoles")');
    console.log("Current Roles: ", JSON.stringify(currentRoles));
    expect(newUrl).toContain('/home/add-target');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
