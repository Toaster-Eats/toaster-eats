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

  /** Check if the user is logged in and their username matches. */
  async isLoggedIn(testController, username) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    const loggedInUser = await Selector('#navbar-current-user').innerText;
    await testController.expect(loggedInUser).eql(username); // Verify logged-in username
  }

  /** Check that someone is logged in, then click items to log out. */
  async logout(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.expect(Selector('#navbar-current-user').exists).ok();
    await testController.click('#navbar-current-user');
    await testController.click('#navbar-sign-out');
  }

  /** Navigate to the sign-in page. */
  async gotoSignInPage(testController) {
    await this.ensureLogout(testController);
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#login-dropdown');
    await testController.click('#login-dropdown-sign-in');
  }

  /** Navigate to the sign-up page. */
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

  /** Navigate to the recipes dropdown. */
  async gotoRecipesDropdown(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) {
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#recipes-dropdown');
  }

  /** Navigate to "View All Recipes" via the recipes dropdown. */
  async gotoRecipesPage(testController) {
    await this.gotoRecipesDropdown(testController);
    await testController.click('#list-recipes-nav'); // Missing semicolon
  }

  /** Navigate to "Add Recipe" via the recipes dropdown. */
  async gotoAddRecipesPage(testController) {
    await this.gotoRecipesDropdown(testController);
    await testController.click('#add-recipes-nav'); // Missing semicolon
  }

  /** Navigate to the ingredients dropdown. */
  async gotoIngredientsDropdown(testController) {
    const visible = await Selector('#basic-navbar-nav').visible;
    if (!visible) { // Fixed syntax error
      await testController.click('button.navbar-toggler');
    }
    await testController.click('#ingredients-dropdown');
  }

  /** Navigate to "View All Ingredients" via the ingredients dropdown. */
  async gotoIngredientsPage(testController) {
    await this.gotoIngredientsDropdown(testController);
    await testController.click('#list-ingredients-nav'); // Missing semicolon
  }

  /** Navigate to "Add Ingredient" via the ingredients dropdown. */
  async gotoAddIngredientsPage(testController) {
    await this.gotoIngredientsDropdown(testController);
    await testController.click('#add-ingredients-nav'); // Missing semicolon
  }
}

export const navBar = new NavBar();
