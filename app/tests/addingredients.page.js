import { Selector } from 'testcafe';

class AddIngredientsPage {
  constructor() {
    this.pageId = '#addingredients-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addIngredientsPage = new AddIngredientsPage();
