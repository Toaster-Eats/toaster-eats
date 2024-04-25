import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { AutoForm, SubmitField, TextField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { useNavigate } from 'react-router-dom';
import { Ingredients } from '../../api/ingredient/Ingredient';
import LoadingSpinner from '../components/LoadingSpinner';

// New form
const bridge = new SimpleSchema2Bridge(Ingredients.schema);

const EditIngredient = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { doc, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(Ingredients.userPublicationName);
    const rdy = subscription.ready();
    const document = Ingredients.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { name, image, location, price } = data;
    Ingredients.collection.update(
      _id,
      { $set: { name, image, location, price } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Ingredient updated successfully', 'success').then(() => {
            navigate('/ingredients'); // Redirect after successful update
          });
        }
      },
    );
  };

  return ready ? (
    <Container className="py-0" fluid>
      <Row className="align-middle text-center header-background">
        <Col>
          <Image src="/images/header_banner.png" height={270} />
        </Col>
      </Row>
      <Row className="justify-content-center py-3">
        <Col xs={10}>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <Card>
              <Card.Body>
                <h6>Image</h6>
                <TextField name="image" label="" placeholder="Link" />

                <h6>Ingredient</h6>
                <TextField name="name" label="" placeholder="Name" />

                <h7>Location</h7>
                <TextField name="location" label="" />

                <h7>Price</h7>
                <TextField name="price" label="" />

                <Row className="justify-content-center">
                  <Col xs={12} className="text-center">
                    <SubmitField />
                    <ErrorsField />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

export default EditIngredient;
