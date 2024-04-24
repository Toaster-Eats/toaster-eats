import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// eslint-disable-next-line react/prop-types
const WelcomeMsg = ({ currentUser }) => {
  let welcomemsg = 'Hey';
  let smallmsg = 'Hello';

  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      welcomemsg = 'Hello admin';
      smallmsg = 'Hello';
    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      welcomemsg = 'Hello vendor';
      smallmsg = 'Hello';
    } else {
      welcomemsg = 'Hi';
      smallmsg = 'Hello';

    }
  }

  return (
    <div>
      <h1>{welcomemsg}</h1>
      <h4>{smallmsg}</h4>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('userData'); // Assuming you publish user data including role
  return {
    currentUser: Meteor.user(),
  };
})(WelcomeMsg);
