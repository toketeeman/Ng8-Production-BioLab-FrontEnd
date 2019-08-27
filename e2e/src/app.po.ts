import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(
      by.css("app-root app-login-form div form h3")
    ).getText() as Promise<string>;
  }
}
