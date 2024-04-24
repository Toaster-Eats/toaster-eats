import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Image } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const RoleLogo = ({ currentUser }) => {
  let rolelogo = 'Hey';
  let  smallmsg = '';
  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      rolelogo = 'Hello admin';
      smallmsg = '';

    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      rolelogo = 'Hello vendor';
      smallmsg = '';
    } else {
      rolelogo = '';
      smallmsg = '';

    }
  }

  return (
    <div>
      <h1>{rolelogo}</h1>
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe('userData'); // Assuming you publish user data including role
  return {
    currentUser: Meteor.user(),
  };
})(RoleLogo);
