import { LoginPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise } from "protractor";
import { environment } from "../../src/environments/environment";
import { AppSettings } from "../../src/app/appsettings/appsettings";

describe("workspace-project App", () => {
  let page: LoginPage;

  beforeEach(async () => {
    // No preparation at this time.
  });

  it('should successfully bring up login page.', async () => {
    // Bring up the login page.
    page = new LoginPage();
    await page.navigateTo();
    const newUrl = await browser.getCurrentUrl();
    console.log("E2E - Initial URL: ", newUrl);
    expect(await page.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('user1/password1 should log in successfully to correct initial page according to roles.', async () => {
    // Enter login credentials.
    const userName = element(by.id('username'));
    await userName.sendKeys('user1');
    const password = element(by.id('password'));
    await password.sendKeys('password1');
    const loginButton = await element(by.css('.btn-login'));
    await loginButton.click();

    // Verify we entered correct first page after login as per our roles.
    const newUrl = await browser.getCurrentUrl();
    console.log("E2E - New URL: ", newUrl);
    const currentRoles: string[] = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("E2E - Current Roles: ", JSON.stringify(currentRoles));
    if (currentRoles.includes(AppSettings.SUBMITTER_ROLE)) {
      expect(newUrl).toContain('/home/add-target');
    } else if (currentRoles.includes(AppSettings.VIEWER_ROLE)) {
      expect(newUrl).toContain('/home/search-targets');
    } else {
      expect(newUrl).toContain('/login');
    }
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
