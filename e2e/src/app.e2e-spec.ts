import { AppPage } from "./app.po";
import { browser, element, by, ExpectedConditions, logging, promise } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
  });

  it("should display welcome message", async () => {
    page.navigateTo();
    expect(await page.getTitleText()).toEqual("Log in to the AbSci Target Database");
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
