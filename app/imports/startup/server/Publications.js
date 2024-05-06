import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Recipes } from '../../api/recipe/Recipe';
import { Ingredients } from '../../api/ingredient/Ingredient';
import { Shops } from '../../api/shop/Shops';

// Allows viewing all ingredients as long as you are logged in
Meteor.publish(Ingredients.userPublicationName, function () {
  if (this.userId) {
    return Ingredients.collection.find();
  }
  return this.ready();
});

Meteor.publish(Shops.userPublicationName, function () {
  if (this.userId) {
    return Shops.collection.find();
  }
  return this.ready();
});
// Allows viewing all recipes as long as you are logged in
Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    return Recipes.collection.find();
  }
  return this.ready();
});

// Allows viewing recipes for public viewing without requiring login
// Used for TopPicks page
Meteor.publish(Recipes.PublicationName, function () {
  return Recipes.collection.find();
});

/* Keep below code for future permission lock for ability to edit Recipes based on owner
// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Recipes.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Recipes.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Recipes.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Recipes.collection.find();
  }
  return this.ready();
});
*/

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise, publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise, publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
