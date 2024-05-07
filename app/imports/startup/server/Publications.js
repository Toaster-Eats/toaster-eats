import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Recipes } from '../../api/recipe/Recipe';
import { Ingredients } from '../../api/ingredient/Ingredient';
import { Shops } from '../../api/shop/Shops';
import { Favorites } from '../../api/favorite/Favorite';

// Adjusted publication for Favorites: restrict to the logged-in user's favorites
Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    return Favorites.collection.find({ userId: this.userId }); // Ensure filtering by correct field
  }
  return this.ready();
});

// Existing publication for Ingredients: allows viewing all ingredients as long as you are logged in
Meteor.publish(Ingredients.userPublicationName, function () {
  if (this.userId) {
    return Ingredients.collection.find(); // No additional filtering required
  }
  return this.ready();
});

Meteor.publish(Shops.userPublicationName, function () {
  if (this.userId) {
    return Shops.collection.find(); // No additional filtering required
  }
  return this.ready();
});

// Existing publication for Recipes: allows viewing recipes if logged in
Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    return Recipes.collection.find(); // No additional filtering required
  }
  return this.ready();
});

// Allows public viewing of recipes without requiring login
Meteor.publish(Recipes.PublicationName, function () {
  return Recipes.collection.find(); // No user-specific filtering
});

// Maintain admin-level publication for Recipes
Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find(); // Admins can view all recipes
  }
  return this.ready(); // Return empty if not admin
});

// User-level publication for Stuffs: restrict to the logged-in user's ownership
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username }); // Only return Stuffs for logged-in user
  }
  return this.ready();
});

// Maintain admin-level publication for Stuffs
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find(); // Admins can view all Stuffs
  }
  return this.ready(); // Return empty if not admin
});

// Keep alanning:roles publication intact
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId }); // Publish roles for each user
  }
  return this.ready(); // Return empty if not logged in
});
