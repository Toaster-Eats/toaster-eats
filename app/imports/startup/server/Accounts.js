import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { check } from 'meteor/check';
import { Favorites } from '../../api/favorite/Favorite'; // For input validation

/* eslint-disable no-console */

// Function to create a user with a specified role
const createUser = (email, password, role) => {
  console.log(`Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email,
    password,
  });

  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }

  if (role === 'vendor') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'vendor');
  }

  return userID;
};

// When running app for the first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.forEach(({ email, password, role }) => createUser(email, password, role));
  } else {
    console.log('Cannot initialize the database! Please invoke meteor with a settings file.');
  }
}

// Meteor method to add roles to a specific user
Meteor.methods({
  'user.addRole'(userId, role) {
    check(userId, String); // Validate the user ID
    check(role, String); // Validate the role name

    // Ensure only admins can add roles
    if (!Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized', 'Only admins can add roles.');
    }

    if (!Roles.roleExists(role)) {
      Roles.createRole(role);
    }
    Roles.addUsersToRoles(userId, role);
  },
});

// Meteor method to toggle recipe favorites
Meteor.methods({
  'user.toggleFavorite'(recipeId) {
    check(this.userId, String); // Validate the user ID
    check(recipeId, String); // Validate the recipe ID

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to favorite or unfavorite recipes.');
    }

    const userId = this.userId; // Ensure you're using the correct field to identify the user
    const favorite = Favorites.collection.findOne({ userId, recipeId });

    if (favorite) {
      // If already favorited, remove it
      Favorites.collection.remove(favorite._id);
    } else {
      // If not favorited, add it
      Favorites.collection.insert({ userId, recipeId }); // Insert with correct user ID
    }
  },
});
