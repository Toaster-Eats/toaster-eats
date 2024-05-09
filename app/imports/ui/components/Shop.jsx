import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';
/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Shop = ({ shop }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={shop.image} width={75} />
      <Card.Title>{shop.name} </Card.Title>
      <Card.Subtitle>{shop.location}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{shop.description}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Shop.propTypes = {
  shop: PropTypes.shape({
    name: String,
    address: String,
    image: String,
    hours: String,
    description: String,
    location: String,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default Shop;
