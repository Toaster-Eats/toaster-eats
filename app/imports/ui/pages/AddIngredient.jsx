import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';
import { Ingredients } from '../../api/ingredient/Ingredient';

// Define a schema for adding new ingredients
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  price: Number,
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema); // Create the bridge for schema validation

const AddIngredient = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const submit = (data) => {
    const { name, image, price, location } = data;
    const owner = Meteor.user()?.username || 'unknown'; // Get the current user as the owner
    Ingredients.collection.insert(
      { name, image, price, location, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error'); // Display error message
        } else {
          swal('Success', 'Ingredient added successfully', 'success').then(() => {
            navigate('/ingredients'); // Redirect to the ingredients page after success
          }); // Navigate to the ingredients page
        }
      },
    );
  };

  let fRef = null; // Form reference

  return (
    <Container className="py-0" fluid>
      <Row className="align-middle text-center header-background">
        <Col>
          <Image src="/images/header_banner.png" height={270} />
        </Col>
      </Row>
      <Row className="justify-content-center pt-4 mb-5">
        <Col xs={6}>
          <AutoForm ref={(ref) => { fRef = ref; }} schema={bridge} onSubmit={(data) => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col>
                    <h6>Image</h6>
                    <TextField name="image" label="" placeholder="Link" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Ingredient</h6>
                    <TextField name="name" label="" placeholder="Name" />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Location</h6>
                    <TextField name="location" label="" placeholder="Safeway, Foodland, etc." />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6>Cost</h6>
                    <TextField name="price" label="" placeholder="$" />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <SubmitField label="Add Ingredient" />
                    <ErrorsField />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          <br />
        </Col>
      </Row>
    </Container>
  );
};

export default AddIngredient;
