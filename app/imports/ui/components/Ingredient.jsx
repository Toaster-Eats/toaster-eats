import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Image, CardText, CardTitle, CardSubtitle } from 'react-bootstrap';

/** Renders a single ingredient card with details. */
const Ingredient = ({ ingredient }) => (
  <Card className="h-100">
    <Card.Header className="d-flex flex-column align-items-center">
      <Image src={ingredient.image} height={250} width={250} style={{ objectFit: 'cover' }} />
      <div className="text-center mt-3">
        <CardTitle>{ingredient.name}</CardTitle>
        <CardSubtitle>
          <strong>Location:</strong> {ingredient.location || 'N/A'}
        </CardSubtitle>
      </div>
    </Card.Header>
    <CardBody>
      <CardText>
        <strong>Price:</strong> ${ingredient.price ? ingredient.price.toFixed(2) : 'N/A'}
      </CardText>
    </CardBody>
  </Card>
);

// Define the PropTypes for the ingredient object.
Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    location: PropTypes.string,
  }).isRequired,
};

export default Ingredient;
