import { LoginPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise, protractor } from "protractor";
import { environment } from "../../src/environments/environment";
import { AppSettings } from "../../src/app/appsettings/appsettings";

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(async () => {
    // No preparation at this time.
  });

  async function loginWithCredentials( username: string, password: string) {
    const user = element(by.id('username'));
    await user.sendKeys(username);
    const pwd = element(by.id('password'));
    await pwd.sendKeys(password);
    const loginButton = await element(by.css('.btn-login'));
    await loginButton.click();
  }

  async function logoutToRecycle() {
    const logoutButton = await element(by.cssContainingText('.btn-nav', 'Log Out'));
    await logoutButton.click();
  }


  it('1. Any user should successfully bring up login page.', async () => {
    // Bring up the login page.
    loginPage = new LoginPage();
    await loginPage.navigateTo();
    const newUrl = await browser.getCurrentUrl();
    console.log("E2E - Initial URL: ", newUrl);

    // Check that the real login page actually loaded.
    expect(await loginPage.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('2. Valid user should log in successfully to correct initial page according to roles.', async () => {
    // Enter login credentials of a valid user.
    await loginWithCredentials('user1', 'password1');

    // Start verification that we entered correct first page after login as per our roles.
    const newUrl = await browser.getCurrentUrl();
    const currentRoles: string[] | null = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("E2E - Current Roles: ", JSON.stringify(currentRoles));
    if (currentRoles.includes(AppSettings.SUBMITTER_ROLE)) {

      // Check that user with at least submitter role will reach add-target page from login.
      expect(newUrl).toContain('/home/add-target');
    } else if (currentRoles.includes(AppSettings.VIEWER_ROLE)) {

      // Check that user with only viewer role will reach target search page from login.
      expect(newUrl).toContain('/home/search-targets');
    } else {

      // Check that a non-submitter non-viewer user will be immediately returned to login after login attempt.
      expect(newUrl).toContain('/login');

      // Start verification of an error dialog for a non-submitter non-viewer user.
      const errorHeader = element(by.css('mat-dialog-container header div'));
      browser.wait(EC.visibilityOf(errorHeader), 5000);

      // Check that an error dialog has appeared for a non-submitter non-viewer user.
      expect(await errorHeader.getText()).toEqual('Error');
    }
  });

  it('3. Valid user should have correct menu as per roles.', async () => {



  });

  it('4. Invalid user should be denied login.', async () => {
    // Recycle by logging out.
    await logoutToRecycle();

    // Enter login credentials of an invalid user.
    await loginWithCredentials('userx', 'passwordx');

    // Check that an invalid user will be immediately returned to login after login attempt.
    const newUrl = await browser.getCurrentUrl();
    expect(newUrl).toContain('/login');

    // Start verification of an error dialog for a non-submitter non-viewer user.
    const errorHeader = element(by.css('mat-dialog-container header div'));
    browser.wait(EC.visibilityOf(errorHeader), 5000);

    // Check that an error dialog has appeared for a non-submitter non-viewer user.
    expect(await errorHeader.getText()).toEqual('Error');
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
