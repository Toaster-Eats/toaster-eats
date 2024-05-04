import { Selector } from 'testcafe';

class VendorPage {
  constructor() {
    this.pageId = '#vendor-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const vendorPage = new VendorPage();
