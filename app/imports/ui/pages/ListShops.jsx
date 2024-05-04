import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Shops } from '../../api/shop/Shops';
import Shop from '../components/Shop';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListShops = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, shops } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Shops.userPublicationName);

    const rdy = subscription.ready();
    // Get the Stuff documents
    const shopItems = Shops.collection.find({}).fetch();
    return {
      shops: shopItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>Shops Near Campus</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {shops.map((shop) => (<Col key={shop._id}><Shop shop={shop} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListShops;
