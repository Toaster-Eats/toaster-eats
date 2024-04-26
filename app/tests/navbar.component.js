import { Selector } from 'testcafe';

class NavBar {

  /** If someone is logged in, then log them out, otherwise do nothing. */
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

  async gotoSignUpPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-up');
  }

  /** Navigate to the vendor page. */
  async gotoVendorPage(testController) {
    await testController.click('#vendor-nav');
  }

  /** Navigate to recipes dropdown. */
  async gotoRecipesDropdown(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#recipes-dropdown');
  }

  /** Navigate to "View All Recipes" via recipes dropdown. */
  async gotoRecipesPage(testController) {
    await this.gotoRecipesDropdown(testController);
    await testController.click('#list-recipes-nav');
  }

  /** Navigate to "Add Recipe" via recipes dropdown. */
  async gotoAddRecipesPage(testController) {
    await this.gotoRecipesDropdown(testController);
    await testController.click('#add-recipes-nav');
  }

  /** Navigate to ingredients dropdown. */
  async gotoIngredientsDropdown(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#ingredients-dropdown');
  }

  /** Navigate to "View All Ingredients" via ingredients dropdown. */
  async gotoIngredientsPage(testController) {
    await this.gotoIngredientsDropdown(testController);
    await testController.click('#list-ingredients-nav');
  }

  /** Navigate to "Add Ingredient" via ingredients dropdown. */
  async gotoAddIngredientsPage(testController) {
    await this.gotoIngredientsDropdown(testController);
    await testController.click('#add-ingredients-nav');
  }
}

export const navBar = new NavBar();
