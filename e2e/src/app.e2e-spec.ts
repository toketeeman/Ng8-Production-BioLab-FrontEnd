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
//
// The first test covers accessing the deployed app.
//
// Each subsequent test starts with the login page and ends on the login page.
//
// For asynchonous stability, a flow-restart is placed at each test's beginning,
// to shield it from possible effects from the immediately-preceding test, although
// it is often not needed.
//

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(async () => {
    // No preparation at this time.
  });

  async function restartAppFlow() {
    loginPage = new LoginPage();
    await loginPage.navigateTo();
  }

  async function loginWithCredentials( username: string, password: string) {
    
    // Use only in-memory-DB login/password if running in dev.local.
    if (environment.configuration === 'dev.local' && username !== 'userx') {
      username = 'user1';
      password = 'password1';
    }

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
    // Pre-condition: none.

    await restartAppFlow();

    const newUrl = await browser.getCurrentUrl();
    console.log("\n----E2E Test 1 - Initial Access URL: ", newUrl);

    // Check that the real login page actually loaded.
    expect(await loginPage.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('2. Valid user should log in successfully to appropriate initial page according to roles.', async () => {
    // Pre-condition: we are now at the login page.
    // Pre-condition: supplied user must be valid with zero or more roles.

    await restartAppFlow();

    // Enter login credentials of a valid user.
    await loginWithCredentials('user1', 'password1');

    // Start verification that we entered correct first page after login as per our roles.
    const newUrl = await browser.getCurrentUrl();
    const currentRoles: string[] | null = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E Test 2 - Current Roles: ", JSON.stringify(currentRoles));
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
    // Pre-condition: supplied user must be valid with one or more roles.

    await restartAppFlow();

    // Enter login credentials of an VALID user.
    await loginWithCredentials('user1', 'password1');

    // Allow test only if user has at least one role.
    await browser.getCurrentUrl();
    const currentRoles: string[] = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E Test 3 - Current Roles: ", JSON.stringify(currentRoles));
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
      console.log("\n----E2E - Test 3 was not run. Requires valid user with at least one role.");
    }
  });

  it('4. Invalid user should be denied login with error message.', async () => {
    // Pre-condition: we are now at the login page.
    // Pre-condition: supplied user must be invalid.

    await restartAppFlow();

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

  it('5. Valid viewer user should be able to access target search page and target detail page.', async () => {
    // Pre-condition: we are now at the login page.

    await restartAppFlow();

    // Enter login credentials of a valid viewer user.
    await loginWithCredentials('user1', 'password1');
    await browser.getCurrentUrl();

    // Allow test only if user has at least viewer role.
    const currentRoles: string[] = await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E Test 5 - Current Roles: ", JSON.stringify(currentRoles));
    if (currentRoles.includes(AppSettings.VIEWER_ROLE)) {

      // Click on menu to see options. Then click on the Search Targets option.
      let menuButton = null;
      menuButton = await element(by.id('e2e-mat-menu'));
      await menuButton.click();
      const searchTargetsSelection = await element(by.cssContainingText('.mat-menu-content button', 'Search Targets'));
      await searchTargetsSelection.click();

      // Check that the target search page has come up.
      const searchTargetUrl = await browser.getCurrentUrl();
      expect(searchTargetUrl).toContain('/home/search-targets');

      // Check that at least one target row was retrieved from the backend.
      const allRowsOnPage = element.all(by.css('div.ag-center-cols-container div.ag-row'));
      expect(allRowsOnPage.count()).toBeGreaterThan(0);

      // Check that clicking some target row will retrieve the target detail page.
      const anyRow = element(by.css('.ag-body-viewport'));
      expect(anyRow.isPresent()).toBeTruthy();
      await anyRow.click();
      const targetDetailUrl = await browser.getCurrentUrl();
      expect(targetDetailUrl).toMatch(/.+\/home\/target-detail\/\d+/);

      // Check that a target has been loaded into the target details page.





    } else {
      console.log("\n----E2E - Test 5 was not run. Requires valid user to be a viewer.");
    }
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


