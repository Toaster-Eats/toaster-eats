import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// eslint-disable-next-line react/prop-types
const BottomMsg = ({ currentUser }) => {
  // eslint-disable-next-line max-len
  let welcomemsg = 'Get Cooking with Us! Sign up for free to gain access to hundreds of mouthwatering recipes designed to fit your busy student lifestyle.';

  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      // eslint-disable-next-line max-len
      welcomemsg = 'Get Cooking with Us!';

    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      // eslint-disable-next-line max-len
      welcomemsg = 'Get Cooking with Us!';

    } else {
      welcomemsg = 'Get Cooking with Us!';

    }
  }

  return (
    <div>
      <h3>{welcomemsg}</h3>

    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('userData'); // Assuming you publish user data including role
  return {
    currentUser: Meteor.user(),
  };
})(BottomMsg);
