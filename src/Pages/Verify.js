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
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

var contract = {};

export default function Verify(props) {
  contract = props.contract;
  const [veriReq, setVeriReq] = useState([]);
  useEffect(() => {
  }, [contract]);

  return (
    <div>
      <div className="blur verify-bg"></div>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Col>
              <Card className="m-2 card-bg " style={{ borderRadius: "16px" }}>
                <Card.Img variant="top" src={charity} />
                <Card.Body className="text-light">
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
          ))}
        </Row>
      </Container>
    </div>
  );
}
