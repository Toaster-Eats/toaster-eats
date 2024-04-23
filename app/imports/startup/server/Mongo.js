import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Recipes } from '../../api/recipe/Recipe';
import { Ingredients } from '../../api/ingredient/Ingredient';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addData = (data) => {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
};

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

// Initialize the database with a default data document.
const addRecipe = (recipe) => {
  console.log(`  Adding Recipe: ${recipe.title} (${recipe.owner})`);
  Recipes.collection.upsert({ title: recipe.title, owner: recipe.owner }, { $set: recipe });
};

// Initialize the Recipes collection
if (Meteor.settings.defaultRecipes) {
  console.log('Creating default recipes.');
  Meteor.settings.defaultRecipes.forEach(recipe => addRecipe(recipe));
}

const addIngredient = (ingredient) => {
  console.log(`  Adding Ingredient: ${ingredient.name}`);
  Ingredients.collection.upsert({ name: ingredient.name }, { $set: ingredient });
};

// Initialize the Ingredients collection if empty.
if (Meteor.settings.defaultIngredients) {
  console.log('Creating default ingredients.');
  Meteor.settings.defaultIngredients.forEach(ingredient => addIngredient(ingredient));
}
