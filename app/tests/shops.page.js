import { Selector } from 'testcafe';

class ShopPage {
  constructor() {
    this.pageId = '#shops-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const shopPage = new ShopPage();
