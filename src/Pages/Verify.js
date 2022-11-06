import React from "react";
import "./Verify.css";
import "./Request.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import charity from "../Images/charity.jpg";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Verify() {
  return (
    <div>
      <div className="blur verify-bg"></div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {Array.from({ length: 24 }).map((_, idx) => (
            <Col>
              <Card className="m-2">
                <Card.Img variant="top" src={charity} />
                <Card.Body>
                  {/* <Stack
                    direction="horizontal"
                    className="justify-content-between mb-3"
                  >
                    <img src={charity} alt="img-1" className="card-img" />
                    <img src="holder.js/50x50" alt="img-1" />
                    <img src="holder.js/50x50" alt="img-1" />
                    <img src="holder.js/50x50" alt="img-1" />
                  </Stack> */}
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Verify Request</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
