import React from "react";
import "./Verify.css";
import "./Request.css";
import Card from "react-bootstrap/Card";
import charity from "../Images/charity.jpg";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Verify(props) {
  const [isVerifier, setIsVerifier] = useState(0);

  useEffect(() => {
    async function getVerifiers() {
      props.contract.methods
        .verifierLength()
        .call()
        .then(async (length) => {
          for (let i = 0; i < length; ++i) {
            await props.contract.methods
              .verifiers(i)
              .call()
              .then((address) => {
                console.log(address);
                if (props.account.toLowerCase() === address.toLowerCase()) {
                  setIsVerifier(1);
                }
              });
          }
        });
    }
    if (props.loaded) {
      getVerifiers();
    }
  }, [props.loaded]);

  return (
    <div>
      <div className="blur verify-bg"></div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {isVerifier
            ? Array.from({ length: 5 }).map((_, idx) => (
                <Col key={idx}>
                  <Card
                    className="m-2 card-bg "
                    style={{ borderRadius: "16px" }}
                  >
                    <Card.Img variant="top" src={charity} />
                    <Card.Body className="text-light">
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <div style={{ marginLeft: "5vw" }}>
                        <button
                          variant="primary"
                          className="btn-grad"
                          style={{ margin: "5px", padding: "5px 30px" }}
                        >
                          {" "}
                          <NavLink
                            to="/details"
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            Verify Request
                          </NavLink>{" "}
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : "UNAUTHORIZED"}
        </Row>
      </Container>
    </div>
  );
}
