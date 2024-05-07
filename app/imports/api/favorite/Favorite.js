import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const FavoritesCollection = new Mongo.Collection('Favorites');
const FavoritesSchema = new SimpleSchema({
  userId: {
    type: String,
    required: true, // Ensure this field is required
  },
  recipeId: {
    type: String,
    required: true,
  },
}, { tracker: Tracker });

FavoritesCollection.attachSchema(FavoritesSchema);

export const Favorites = {
  collection: FavoritesCollection,
  userPublicationName: 'Favorites.userPublication', // Ensure the publication name is correct
};
