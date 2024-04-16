import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class RecipesCollection {
  constructor() {
    this.name = 'RecipesCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      title: String,
      image: String,
      description: String,
      instructions: String,
      dietaryRestrictions: String,
      ingredients: Array,
      'ingredients.$': Object,
      'ingredients.$.name': String,
      'ingredients.$.cost': Number,
      'ingredients.$.location': String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Recipes = new RecipesCollection();
