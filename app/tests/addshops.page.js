import { Selector } from 'testcafe';

class AddShopsPage {
  constructor() {
    this.pageId = '#addshops-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addShopsPage = new AddShopsPage();
