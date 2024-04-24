import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Image } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const RoleLogo = ({ currentUser }) => {
  let rolelogo = (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label,max-len
    <a href="https://www.freepik.com/free-vector/hand-drawn-fast-food-illustration_15593063.htm#fromView=search&page=1&position=38&uuid=89ae87c3-4ed4-4f57-90f8-9f2bf4646215"><Image src="/images/junk_food.jpg" width="320px" roundedCircle /> <br /></a>

  );

  if (currentUser) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      rolelogo = (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <a href="https://pngimg.com/d/key_PNG103643.png">
          <Image src="/images/key_PNG103643.png" width="300px" />
        </a>
      );
    } else if (Roles.userIsInRole(Meteor.userId(), 'vendor')) {
      // Assign JSX to rolelogo
      rolelogo = (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <a href="https://easydrawingguides.com/wp-content/uploads/2022/11/how-to-draw-a-shop-featured-image-1200.png">
          <Image src="/images/shop.png" width="320px" roundedCircle />
        </a>
      );
    } else {
      rolelogo = (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label,max-len
        <a href="https://www.freepik.com/free-vector/hand-drawn-fast-food-illustration_15593063.htm#fromView=search&page=1&position=38&uuid=89ae87c3-4ed4-4f57-90f8-9f2bf4646215"><Image src="/images/junk_food.jpg" width="320px" roundedCircle /> <br /></a>
      );
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
