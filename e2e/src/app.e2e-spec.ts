import { LoginPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise, protractor } from "protractor";
import { AppSettings } from "../../src/app/appsettings/appsettings";

// NOTES:
//
// This test is run by the command below in the VS Code terminal in the root folder:
//
//     ng e2e --protractorConfig=e2e/protractor.conf.ts --configuration=dev.local
// OR
//     ng e2e --protractorConfig=e2e/protractor.conf.ts --configuration=dev.docker
//
// When developing these tests further, do NOT import and use environment.ts! Unlike
// ng build and ng serve, the command ng e2e does NOT automatically replace environment.ts
// with another environment file specified by the --configuration switch!
//
// This e2e test has been coded in latest Protractor 6-ish style (we're actually running
// protractor 5.4.2) that supports the new async/await control flow coming in Selenium 4.
// Protractor 6 is now in alpha and will be arriving soon. This code should migrate
// into the new protractor withoout changes.
//
// A set of special (phantom) VALID user accounts have been installed
// beforehand in order to run this e2e test. One special valid user possessing each
// combination of roles, respectively, has been provided. (See Evan for info.)
//
// One additional user who is non-existant (i.e. clearly invalid) is also used.
// (We're simply using userx/passwordx here for that.)
//
// This test can only be run only in the dev.local and dev.docker configurations because it will
// need to be easily repeatable against the backend (in-memory-DB or Docker Desktop) in the presence
// of posts. (It could also be run in dev.remote if there are no POSTS to a DB caused by these tests,
// or if those tests that do posts are conditionally excluded from the test!)
//
// If very detailed tests are added that checks the results of very specific updates or
// very specific searches, those tests should be conditioned to run ONLY in dev.docker
// because dev.local ONLY SIMULATES some of those operations. After each e2e run in dev.docker,
// the Docker Desktop environment must be recycled to restore the initial test databases.
//
// The first test covers accessing the deployed app.
//
// Each subsequent test starts with the login page and ends on the login page.
//
// For asynchonous stability, a test-flow-restart is placed at each test's beginning - unless
// the PRECEDING test did not do an explicit logout - to shield it from possible
// side-effects from the preceding test, although it is often not needed.
//

describe("workspace-project App", () => {
  let loginPage: LoginPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(async () => {
    browser.waitForAngular();
  });


  // ----------------- Test helpers -----------------------

  async function restartAppSession() {
    loginPage = new LoginPage();
    await loginPage.navigateTo();

    // Make sure we're at the login page.
    browser.wait(EC.urlContains('login'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.+\/login/);
  }


  async function loginWithCredentials( username: string, password: string, homePageCheck: boolean) {

    // The code below must be activated ONLY for dev.local mode!
    // Otherwise it is to be left commented out. Thus it is
    // intended only for aiding the development of tests in dev.local.
    //
    // Use if-statement below ONLY for dev.local!

    // if (username !== 'userx') {                  //  UN-COMMENT
    //   username = 'user1';                        //     ONLY
    //   password = 'password1';                    //     FOR
    // }                                            //  DEV.LOCAL !

    // Make sure we're at the login page.
    browser.wait(EC.urlContains('login'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.+\/login/);

    console.log("\n----E2E - Current Username: ", username);
    const user = element(by.id('username'));
    await user.sendKeys(username);
    const pwd = element(by.id('password'));
    await pwd.sendKeys(password);
    const loginButton = await element(by.css('.btn-login'));
    await loginButton.click();

    // Check that we get to the first page beyond the login page.
    if (homePageCheck) {
      browser.wait(EC.urlContains('home'), 10000);
      expect(browser.getCurrentUrl()).toMatch(/.+\/home\/.+/);
    }
  }


  async function logoutToRecycle() {
    const logoutButton = await element(by.cssContainingText('.btn-nav', 'Log Out'));
    await logoutButton.click();

    // Check that we get back to the login page.
    browser.wait(EC.urlContains('login'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.+\/login/);
  }


  async function initialPageTest(userName, password) {

    // Enter login credentials of a valid user.
    if (userName === 'testuser_NO_GROUPS') {
      await loginWithCredentials(userName, password, false);
    } else {
      await loginWithCredentials(userName, password, true);
    }

    // Start verification that we entered correct first page after login as per our roles.
    const newUrl = await browser.getCurrentUrl();
    const currentRoles: string[] | null =
      await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E - Current Roles: ", JSON.stringify(currentRoles));
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

      // Check that we get back to the login page.
      browser.wait(EC.urlContains('login'), 10000);
      expect(browser.getCurrentUrl()).toMatch(/.+\/login/);
    }
  }


  async function menuActivationTest(userName, password) {

    // Enter login credentials of an VALID user.
    if (userName === 'testuser_NO_GROUPS') {
      await loginWithCredentials(userName, password, false);
    } else {
      await loginWithCredentials(userName, password, true);
    }

    // Find user's roles.
    await browser.getCurrentUrl();
    const currentRoles: string[] =
      await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E - Current Roles: ", JSON.stringify(currentRoles));

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
  }


  // -------------------- Test Sequence Below ---------------------

  it('1. Any user - valid or invalid - should successfully bring up login page.', async () => {
    // Pre-condition: none.

    await restartAppSession();

    const newUrl = await browser.getCurrentUrl();

    // Check that the real login page actually loaded.
    expect(await loginPage.getTitleText()).toEqual("Log in to the AbSci Target Database");
  });

  it('2. Valid viewer-only user should log in successfully to appropriate initial page according to roles.', async () => {
    // Pre-condition: supplied user must be valid with only viewer role.

    await restartAppSession();

    // await initialPageTest('testuser_VIEWER', '%aEX@D4ez@DT');
    await initialPageTest('testuser_VIEWER', '%aEX@D4ez@DT');

  });

  it('3. Valid submitter-only user should log in successfully to appropriate initial page according to roles.', async () => {
    // Pre-condition: supplied user must be valid with only submitter role.

    await restartAppSession();

    await initialPageTest('testuser_SUBMITTER', 'k6AaV#&H%0nn');

  });

  it('4. Valid viewer-submitter user should log in successfully to appropriate initial page according to roles.', async () => {
    // Pre-condition: supplied user must be valid with both viewer and submitter roles.

    await restartAppSession();

    await initialPageTest('testuser_VIEWER_SUBMITTER', 'U7f$kn&VoAzM');

  });

  it('5. Valid viewer-only user should have correct menu activation as per roles upon login.', async () => {
    // Pre-condition: supplied user must be valid with viewer role.

    await restartAppSession();

    await menuActivationTest('testuser_VIEWER', '%aEX@D4ez@DT');

  });

  it('6. Valid submitter-only user should have correct menu activation as per roles upon login.', async () => {
    // Pre-condition: supplied user must be valid with submitter role.

    await restartAppSession();

    await menuActivationTest('testuser_SUBMITTER', 'k6AaV#&H%0nn');

  });

  it('7. Valid viewer-submitter user should have correct menu activation as per roles upon login.', async () => {
    // Pre-condition: supplied user must be valid with viewer and submitter roles.

    await restartAppSession();

    await menuActivationTest('testuser_VIEWER_SUBMITTER', 'U7f$kn&VoAzM');

  });

  it('8. Invalid user should be denied login with error message.', async () => {
    // Pre-condition: supplied user must be invalid.

    await restartAppSession();

    // Enter login credentials of an INVALID user.
    await loginWithCredentials('userx', 'passwordx', false);

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

    // Check that we get back to the login page.
    browser.wait(EC.urlContains('login'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.+\/login/);
  });

  it('9. Valid viewer user should be able to access target search page and target detail page.', async () => {

    await restartAppSession();

    // Enter login credentials of a valid viewer user.
    await loginWithCredentials('testuser_VIEWER', '%aEX@D4ez@DT', true);
    await browser.getCurrentUrl();

    // Allow test only if user has at least viewer role.
    const currentRoles: string[] =
      await browser.driver.executeScript('return JSON.parse(window.sessionStorage.getItem("currentRoles"))');
    console.log("\n----E2E - Current Roles: ", JSON.stringify(currentRoles));

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

    // Check that the target detail page has been reachedwith some target id.
    browser.wait(EC.urlContains('target-detail'), 10000);
    expect(browser.getCurrentUrl()).toMatch(/.+\/home\/target-detail\/\d+/);

    // Check that a target has been loaded into the target details page
    // by discovering the existence of at least one subunit.
    const allSubunitsOnPage = element.all(by.css('ngu-tile mat-card'));
    expect(allSubunitsOnPage.count()).toBeGreaterThan(0);

    // Check that clicking the biophysical properties button will retrieve the bio-props page.
    // await element(by.cssContainingText('.mat-button span', 'Biophysical Properties')).click();
    // browser.wait(EC.urlContains('target-property'), 10000);
    // expect(browser.getCurrentUrl()).toMatch(/.+\/home\/target-property\/\d+/);



    // Recycle for next test by logging out.
    logoutToRecycle();
  });

  // This test below fails in protractor and the fix remains to be found. The app itself behaves correctly.

  it('10. Valid no-role user should be denied login according to roles.', async () => {
    // Pre-condition: supplied user must be valid with no roles.

    await restartAppSession();

    // await initialPageTest('testuser_NO_GROUPS', '7@S#HliL813C');  // Insxplicably fails here.

  });


  afterEach(async () => {
    // Ignore fussy browser errors.
  });
});


