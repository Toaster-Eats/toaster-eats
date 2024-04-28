import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// eslint-disable-next-line react/prop-types
const KeyFeatures = ({ currentUser }) => {
  // eslint-disable-next-line max-len
  let welcomemsg = 'Student Contributions: Students can browse, search, and contribute recipes tailored to their constraints, including limited kitchen facilities, time, and budget. They can also upload photos and provide detailed descriptions of their recipes.';
  let msg2 = 'Ingredient Information: For each recipe, the platform aggregates information on ingredient availability and pricing from various local vendors, allowing users to make informed purchasing decisions.';
  let msg3 = 'Dietary Filters: Users can filter recipes based on dietary preferences and restrictions, such as vegan, gluten-free, or allergen-free options, ensuring inclusivity and catering to diverse dietary needs.';
  // eslint-disable-next-line max-len
  let msg4 = "Vendor Integration: Local vendors, such as grocery stores and farmer's markets, can create profiles and input information regarding ingredient availability, pricing, and store locations. This data enhances the accuracy and accessibility of recipe details for students.";
  // eslint-disable-next-line max-len
  let msg5 = 'Admin Oversight: Admins maintain content integrity by monitoring user-generated content, removing inappropriate material, and managing user roles. They also have the authority to designate users as vendors and oversee platform functionality.';

  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      // eslint-disable-next-line max-len
      welcomemsg = 'Admin Oversight: Admins maintain content integrity by monitoring user-generated content, removing inappropriate material, and managing user roles. They also have the authority to designate users as vendors and oversee platform functionality.';
      msg2 = 'You are able to give vendors a "vendor" role, allowing them to create a profile of their stores.';
      msg3 = 'You can edit or delete any recipes.';
      msg4 = 'Admins can also enjoy the website, accessing recipe and ingredient information.';
      msg5 = 'This App was built by UH students, for UH students and community!';
    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      // eslint-disable-next-line max-len
      welcomemsg = "Vendor Integration: Local vendors, such as grocery stores and farmer's markets, can create profiles and input information regarding ingredient availability, pricing, and store locations. This data enhances the accuracy and accessibility of recipe details for students.";
      msg2 = 'Your Store Profile: Include pictures, hours and other details of your store. Students can browse the list of stores and find your profile.';
      msg3 = 'Ingredient Accessibility: Through the ingredients page, you can indicate if an ingredient is in stock, with its price and sizes.';
      msg4 = 'Recipes: Vendors can also contribute to the recipe list, increasing  your exposure to students as they browse our recipes.';
      msg5 = 'This App was built by UH students, for UH students and community!';
    } else {
      welcomemsg =
      'Student Contributions: Students can browse, search, and contribute recipes tailored to their constraints, including limited kitchen facilities, time, and budget. They can also upload photos and provide detailed descriptions of their recipes.';
      msg2 = 'Ingredient Information: For each recipe, the platform aggregates information on ingredient availability and pricing from various local vendors, allowing users to make informed purchasing decisions.';
      msg3 = 'Dietary Filters: Users can filter recipes based on dietary preferences and restrictions, such as vegan, gluten-free, or allergen-free options, ensuring inclusivity and catering to diverse dietary needs.';
      msg4 = 'Cost-Efficiency: Each recipe includes estimated costs per serving, empowering students to make informed decisions based on their budget.';
      msg5 = 'This App was built by UH students, for UH students and community!';

    }
  }

  return (
    <div>
      <li>{welcomemsg}</li>
      <li>{msg2}</li>
      <li>{msg3}</li>
      <li>{msg4}</li>
      <li>{msg5}</li>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('userData'); // Assuming you publish user data including role
  return {
    currentUser: Meteor.user(),
  };
})(KeyFeatures);
