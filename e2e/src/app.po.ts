import { browser, by, element } from "protractor";

export class LoginPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(
      by.css("h3")
    ).getText();
  }
}
