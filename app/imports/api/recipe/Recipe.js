import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class RecipesCollection {
  constructor() {
    this.name = 'RecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      title: String,
      owner: String,
      image: String,
      description: String,
      instructions: String,
      dietaryRestrictions: String,
      ingredients: Array,
      'ingredients.$': Object,
      'ingredients.$.name': String,
      'ingredients.$.cost': Number,
      'ingredients.$.location': String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the RecipesCollection.
 * @type {RecipesCollection}
 */
export const Recipes = new RecipesCollection();
