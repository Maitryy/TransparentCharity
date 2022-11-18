import React from "react";
import "./Home.css";
import "./Request.css";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

export default function Request() {
  return (
    <div>
      <div className=" earth blur"></div>
      <Container>
        <Form className="text-light pt-5">
          <Form.Group as={Row} className="mb-5" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-5"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Text>With textarea</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-5"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label column sm={2}>
              Amount
            </Form.Label>
            <Col sm={10}>
              <InputGroup>
                <InputGroup.Text>ETH.</InputGroup.Text>
                <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formFileMultiple" className="mb-5">
            <Form.Label column sm={2}>
              Required Documents
            </Form.Label>

            <Col sm={10}>
              <Form.Control type="file" multiple />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
