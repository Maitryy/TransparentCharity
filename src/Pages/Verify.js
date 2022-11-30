import React from "react";
import "./Verify.css";
import "./Request.css";
import Card from "react-bootstrap/Card";
import charity from "../Images/charity.jpg";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import CompCarousel from '../Components/CompCarousel'


export default function Verify(props) {
  const [isVerifier, setIsVerifier] = useState(false);
  const [unverifiedRequests, setUnverifiedRequests] = useState([]);

  useEffect(() => {
    async function getVerifiers() {
      let verifierLength = await props.contract.methods.verifierLength().call();
      for (let i = 0; i < verifierLength; ++i) {
        let verifier = await props.contract.methods.verifiers(i).call();
        if (verifier.toLowerCase() === props.account.toLowerCase()) {
          setIsVerifier(true);
        }
      }
    }
    if (props.loaded) {
      getVerifiers();
    }
  }, [props.loaded]);

  useEffect(() => {
    async function getUnverifiedRequests() {
      if (isVerifier) {
        let unverifiedRequestsLength = parseInt(
          await props.contract.methods.unverifiedRequestsLength().call()
        );
        let tmp = [];
        for (let i = 0; i < unverifiedRequestsLength; ++i) {
          tmp.push(await props.contract.methods.unverifiedRequests(i).call());
        }
        setUnverifiedRequests(tmp);
      }
    }
    if (isVerifier) {
      getUnverifiedRequests();
    }
  }, [isVerifier]);

  return (
    <div>
      <div className="blur verify-bg"></div>
      {isVerifier ? (
        <Container>
          <Row xs={1} md={2} lg={3} className="g-4 pt-5">
            {unverifiedRequests.map((_, idx) => (
              <Col key={idx}>
                <Card className="m-2 card-bg " style={{ borderRadius: "16px" }}>
                  <Card.Img variant="top" src={charity} />
                  <Card.Body className="text-light">
                    <Card.Title>{_.title}</Card.Title>
                    <Card.Text>{_.descriptionHash}</Card.Text>
                    <div className="row" style={{ marginLeft: "0.2vw" }}>
                      <div className="col-2 mt-2">
                        <Button
                          variant="success"
                          onClick={() => {
                            props.contract.methods
                              .upvoteRequest(_.id)
                              .send({ from: props.account, gas: 1000000 });
                            console.log(idx);
                          }}
                        >
                          +
                        </Button>
                      </div>
                      <button variant="primary" className="btn-grad col-7">
                        {" "}
                        <a
                          target="_blank"
                          href={_.docHash}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          View Documents
                        </a>{" "}
                      </button>
                      <div className="col-2 mt-2">
                        <Button variant="danger">-</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <div>
        <div className="card-verify text-light">
            <h1 className="pt-5">
              Sorry!!
            </h1>
            <h2 className="pb-5">
              You're unauthorized
            </h2>
        </div>
        </div>
      )}
    </div>
  );
}
