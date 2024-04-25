import { Selector } from 'testcafe';

class NavBar {

  async ensureLogout(testController) {
    const loggedInUser = await Selector('#navbar-current-user').exists;
    if (loggedInUser) {
      await testController.click('#navbar-current-user');
      await testController.click('#navbar-sign-out');
    }
  }

  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  async gotoVendorPage(testController) {
    await testController.click('#vendor-nav');
  }

  async gotoIngredientsPage(testController) {
    // Adjusted to ensure dropdown is clicked, then the specific item
    await testController.click('#ingredients-dropdown');
    await testController.click('#list-ingredients-nav');
  }

  async gotoRecipesPage(testController) {
    await testController.click('#recipes-dropdown');
    await testController.click('#list-recipes-nav');
  }

  async gotoAddRecipesPage(testController) {
    await testController.click('#recipes-dropdown');
    await testController.click('#add-recipes-nav');
  }
}

export const navBar = new NavBar();
