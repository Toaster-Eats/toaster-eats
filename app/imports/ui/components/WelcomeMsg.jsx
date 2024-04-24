import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// eslint-disable-next-line react/prop-types
const WelcomeMsg = ({ currentUser }) => {
  let welcomemsg = '';
  let smallmsg = '';
  // eslint-disable-next-line max-len
  let smallestmsg = 'College students encounter various challenges that can hinder their ability to maintain a healthy lifestyle. Balancing academic demands with limited time and resources often leads to difficulties in prioritizing nutritious meals. ' +
    'Additionally, many students face constraints such as limited kitchen facilities, cooking skills, and access to affordable, fresh ingredients. This, coupled with the allure of convenient but often unhealthy fast food options, ' +
    'exacerbates the struggle to maintain a balanced diet. As a result, students may find themselves resorting to quick, processed meals or snacks from vending machines, compromising their overall health and well-being.';

  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      welcomemsg = 'Welcome, Admin User';
      smallmsg = 'Approve Vendor Roles, Moderate Content and Eat!';
      // eslint-disable-next-line max-len
      smallestmsg = '';

    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      welcomemsg = 'Welcome, Vendor Partner';
      smallmsg = 'Connect your store to UH students!';
      smallestmsg = '';
    } else {
      welcomemsg = '';
      smallmsg = '';
      // eslint-disable-next-line max-len
      smallestmsg = 'College students encounter various challenges that can hinder their ability to maintain a healthy lifestyle. Balancing academic demands with limited time and resources often leads to difficulties in prioritizing nutritious meals. ' +
        'Additionally, many students face constraints such as limited kitchen facilities, cooking skills, and access to affordable, fresh ingredients. This, coupled with the allure of convenient but often unhealthy fast food options, ' +
        'exacerbates the struggle to maintain a balanced diet. As a result, students may find themselves resorting to quick, processed meals or snacks from vending machines, compromising their overall health and well-being.';

    }
  }

  return (
    <div>
      <h1>{welcomemsg}</h1>
      <h4>{smallmsg}</h4>
      <p>{smallestmsg}</p>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('userData'); // Assuming you publish user data including role
  return {
    currentUser: Meteor.user(),
  };
})(WelcomeMsg);
