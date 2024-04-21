import { Selector } from 'testcafe';

class IngredientsPage {
  constructor() {
    this.pageId = '#ingredients-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const ingredientsPage = new IngredientsPage();
