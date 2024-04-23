import { landingPage } from './landing.page';
import { vendorPage } from './vendor.page';
import { ingredientsPage } from './ingredients.page';
import { recipesPage } from './recipes.page';
import { addRecipesPage } from './addrecipes.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test: Landing Page Displays', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test: Sign-in and Sign-out Functions', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test: Vendor Page Displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoVendorPage(testController);
  await vendorPage.isDisplayed(testController);
});

test('Test: Ingredients Page Displays', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoIngredientsPage(testController);
  await ingredientsPage.isDisplayed(testController);
});

test('Test: Recipes Page is Displayed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoRecipesPage(testController);
  await recipesPage.isDisplayed(testController);
});

test('Test: Add Recipes Page is Displayed', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAddRecipesPage(testController);
  await addRecipesPage.isDisplayed(testController);
});
