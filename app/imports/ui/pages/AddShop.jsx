import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Shops } from '../../api/shop/Shops';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  hours: String,
  location: String,
  description: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddShop = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, image, hours, location, description } = data;
    // eslint-disable-next-line no-unused-vars
    const owner = Meteor.user().username;
    Shops.collection.insert(
      { name, image, hours, location, description },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="addshops-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Your Shop Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" /></Col>
                  <Col><TextField name="image" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="hours" /></Col>
                  <Col><TextField name="location" /></Col>
                </Row>
                <LongTextField name="description" />
                <SubmitField />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddShop;
