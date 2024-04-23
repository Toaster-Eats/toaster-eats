import { Selector } from 'testcafe';

class AddRecipesPage {
  constructor() {
    this.pageId = '#addrecipes-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addRecipesPage = new AddRecipesPage();
