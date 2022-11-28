import React from "react";
import { useState } from "react";
import "./Home.css";
import bg1 from "../Images/bg1.jpg";
import earth from "../Images/Earth.jpg";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import FormModal from "../Components/FormModal";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import charity from "../Images/charity.jpg";

export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  const [completedReq, setCompletedReq] = useState([]);
  const [verifiedRequests, setVerifiedRequests] = useState([
    {
      title: "Test Post I",
      docHash:
        "https://ipfs.io/ipfs/bafybeidfxduc6ojbcwos23pkodpjvx2u2snvzv4msuynpeuh7jl4w4fg5y/test.pdf",
      descriptionHash:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dignissimos error temporibus cum ipsam aperiam incidunt eveniet hic nemo dolores voluptas ea nobis quam provident fugit iure, modi vitae ratione",
      amt: 21,
    },
    {
      title: "Test Post II",
      docHash:
        "https://ipfs.io/ipfs/bafybeidfxduc6ojbcwos23pkodpjvx2u2snvzv4msuynpeuh7jl4w4fg5y/test.pdf",
      descriptionHash:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore dignissimos error temporibus cum ipsam aperiam incidunt eveniet hic nemo dolores voluptas ea nobis quam provident fugit iure, modi vitae ratione",
      amt: 21,
    },
  ]);

  const [verifiedRequestLength, setVerifiedRequestLength] = useState(0);

  return (
    <div>
      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        contract={props.contract}
        account={props.account}
      />{" "}
      <div className="text-light mt-5 mx-5">
        <div className="earth">
          <div
            style={{
              fontFamily: "Orbitron",
              fontWeight: "900",
              fontSize: "60px",
              marginTop: "5vh",
            }}
          >
            TRANSPARENT CHARITY SYSTEM
          </div>
          <br />
          <Container>
            <div
              style={{
                fontFamily: "Manrope",
                fontWeight: "400",
                fontSize: "20px",
                color: "lightgray",
              }}
            >
              {" "}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In et
              consequatur sequi minus porro. Laborum nesciunt sed quidem sunt,
              velit veniam quaerat, aperiam amet nostrum perspiciatis repellat
              provident, earum odio.{" "}
            </div>
            <div className="row pt-5">
              <div className="col-3"></div>
              <div className="col-3 ">
                <Button variant="success">Donate Now</Button>{" "}
              </div>

              <div className="col-3">
                <Button
                  variant="warning"
                  onClick={() => {
                    setShowModal(!showModal);
                  }}
                >
                  Create Request
                </Button>{" "}
              </div>
              <div className="col-3"></div>
            </div>
            <div
              style={{
                fontFamily: "Orbitron",
                fontWeight: "900",
                fontSize: "50px",
                marginTop: "5vh",
              }}
            >
              Completed Requests
            </div>
            <Row xs={1} md={2} lg={3} className="g-4 pt-5">
              {verifiedRequests.map((_, idx) => (
                <Col key={idx}>
                  <Card
                    className="m-2 card-bg "
                    style={{ borderRadius: "16px" }}
                  >
                    <Card.Img variant="top" src={charity} />
                    <Card.Body className="text-light">
                      <Card.Title>{_.title}</Card.Title>
                      <Card.Text>{_.descriptionHash}</Card.Text>
                      <div style={{ marginLeft: "4.5vw" }}>
                        <button
                          variant="primary"
                          className="btn-grad"
                          style={{ margin: "5px", padding: "5px 30px" }}
                        >
                          {" "}
                          <a
                            target="_blank"
                            href={_.docHash}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            View Documents
                          </a>{" "}
                        </button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}
