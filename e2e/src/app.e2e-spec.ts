import { LoginPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise, protractor } from "protractor";
import { environment } from "../../src/environments/environment";
import { AppSettings } from "../../src/app/appsettings/appsettings";

// NOTES:
//
// A set of special (phantom) VALID user accounts are required to be established
// beforehand in order to run this e2e test.
//
// One special valid user is needed for possessing each combination of roles, respectively.
//
// One additional user who is non-existant (i.e. clearly invalid) is needed. Make one up.
//
// This test can only be run only in the dev.local and dev.docker configurations because it will
// need to be easily repeatable against the backend (in-memory-DB or Docker Desktop).
//
// If very detailed tests are added that checks the results of very specific updates or
// very specific searches, those tests should be conditioned to run ONLY in dev.docker
// because dev.local only simulates some of those operations. After each e2e run in dev.docker,
// the Docker Desktop environment must be recycled to restore the initial test databases.

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


  it('1. Any user - valid or invalid - should successfully bring up login page.', async () => {
    // Bring up the login page.
    loginPage = new LoginPage();
    await loginPage.navigateTo();
    const newUrl = await browser.getCurrentUrl();
    console.log("E2E - Initial Access URL: ", newUrl);

    // Check that the real login page actually loaded.
    expect(await loginPage.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('2. Valid user should log in successfully to correct initial page according to roles.', async () => {
    // Pre-condition: we are now at the login page.

    // Enter login credentials of a valid user.
    await loginWithCredentials('user1', 'password1');

    // Start verification that we entered correct first page after login as per our roles.
    const newUrl = await browser.getCurrentUrl();
    const currentRoles: string[] | null = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("E2E Test 2 - Current Roles: ", JSON.stringify(currentRoles));
    if (currentRoles.includes(AppSettings.SUBMITTER_ROLE)) {

      // Check that user with at least submitter role will reach add-target page from login.
      expect(newUrl).toContain('/home/add-target');

      // Recycle for next test by logging out.
      await logoutToRecycle();

    } else if (currentRoles.includes(AppSettings.VIEWER_ROLE)) {

      // Check that user with only viewer role will reach target search page from login.
      expect(newUrl).toContain('/home/search-targets');

      // Recycle for next test by logging out.
      await logoutToRecycle();

    } else {

      // Check that a non-submitter non-viewer valid user will be immediately returned to login after login attempt.
      expect(newUrl).toContain('/login');

      // Start verification of an error dialog for a non-submitter non-viewer user.
      const errorHeader = element(by.css('mat-dialog-container header div'));
      browser.wait(EC.visibilityOf(errorHeader), 5000);

      // Check that an error dialog has appeared for a non-submitter non-viewer user.
      expect(await errorHeader.getText()).toEqual('Error');

      // Recycle for next test by dismissing error dialog.
      const errorDialogCloseButton = await element(by.cssContainingText('footer span', 'Close'));
      await errorDialogCloseButton.click();
    }
  });

  it('3. Valid user with at least one role should have correct menu activation as per roles upon login.', async () => {
    // Pre-condition: we are now at the login page.

    // Enter login credentials of an VALID user with at least one role.
    await loginWithCredentials('user1', 'password1');

    // Allow test only if user has at least one role.
    await browser.getCurrentUrl();
    const currentRoles: string[] = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("E2E Test 3 - Current Roles: ", JSON.stringify(currentRoles));
    if (currentRoles.length) {

      // Click on menu to see options.
      let menuButton = null;
      menuButton = await element(by.id('e2e-mat-menu'));
      await menuButton.click();

      // Inspect activation of menu options.
      const registerNewTargetButtonDisabled =
        await element(by.cssContainingText('.mat-menu-content button', 'Register New Target')).getAttribute('disabled');
      const searchTargetsButtonDisabled =
        await element(by.cssContainingText('.mat-menu-content button', 'Search Targets')).getAttribute('disabled');
      const searchPlasmidsButtonDisabled =
        await element(by.cssContainingText('.mat-menu-content button', 'Search Plasmids')).getAttribute('disabled');

      // Test for correct activation for submitter role.
      if (currentRoles.includes(AppSettings.SUBMITTER_ROLE)) {
        expect(registerNewTargetButtonDisabled).toBeFalsy();
      } else {
        expect(registerNewTargetButtonDisabled).toBeTruthy();
      }

      // Test for correct activation for view role.
      if (currentRoles.includes(AppSettings.VIEWER_ROLE)) {
        expect(searchTargetsButtonDisabled).toBeFalsy();
        expect(searchPlasmidsButtonDisabled).toBeFalsy();
      } else {
        expect(searchTargetsButtonDisabled).toBeTruthy();
        expect(searchPlasmidsButtonDisabled).toBeTruthy();
      }

      // Close the menu without making a selection.
      const body = await element(by.css('body'));
      await browser.actions().mouseMove(body, {x: 0, y: 0}).click().perform();

      // Recycle for next test by logging out.
      await logoutToRecycle();
    } else {
      console.log("E2E - Test 3 was not run. Requires valid user with at least one role.");
    }
  });

  it('4. Invalid user should be denied login with error message.', async () => {
    // Pre-condition: we are now at the login page.

    // Enter login credentials of an INVALID user.
    await loginWithCredentials('userx', 'passwordx');

    // Check that an invalid user will be immediately returned to login after login attempt.
    const newUrl = await browser.getCurrentUrl();
    expect(newUrl).toContain('/login');

    // Start verification of an error dialog for a non-submitter non-viewer user.
    const errorHeader = element(by.css('mat-dialog-container header div'));
    browser.wait(EC.visibilityOf(errorHeader), 5000);

    // Check that an error dialog has appeared for a non-submitter non-viewer user.
    expect(await errorHeader.getText()).toEqual('Error');

    // Recycle for next test by dismissing error dialog.
    const errorDialogCloseButton = await element(by.cssContainingText('footer span', 'Close'));
    await errorDialogCloseButton.click();
  });

  it('5. Valid viewer user should be able to access target search page.', async () => {
    // Pre-condition: we are now at the login page.

    // Enter login credentials of an valid viewer user.
    await loginWithCredentials('user1', 'password1');



  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser.
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


