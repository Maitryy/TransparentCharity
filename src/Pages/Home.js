import React from "react";
import { useState } from "react";
import "./Home.css";

import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import FormModal from "../Components/FormModal";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import charity from "../Images/charity.jpg";


export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  const [completedReq, setCompletedReq] = useState([]);
  const [completedReqLength, setCompletedReqLength] = useState(0);

  useEffect(() => {
    async function getData() {
      let ver = parseInt(
        await props.contract.methods.verifiedRequestsLength().call()
      );
      setCompletedReqLength(ver);
      let tmp = [];
      for (let i = 0; i < ver; ++i) {
        let req = await props.contract.methods.verifiedRequests(i).call();
        console.log(req);
        if (req.status === "1") {
          tmp.push(req);
        }
      }
      setCompletedReq(tmp);
    }
    if (props.loaded) {
      getData();
    }
  }, [props.loaded]);

  return (
    <div>
    <div className="verify blur"></div>
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
                width: "80%",
                textAlign: "center",
                marginLeft: "9%",
              }}
            >
              {" "}
              A Trustworthy Platform For Charity Donation, With Transparent Flow
              Of Funds To Gain Trust Of The People. Effortlessly Set Up And Manage Your Fundraiser And Engage With Donors. {" "}
            </div>
            <div className="row pt-5">
              <div className="col-3"></div>
              <div className="col-3 ">
                <NavLink to="/donate">
                  <Button variant="success">Donate Now</Button>
                </NavLink>
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
                marginTop: "5%",
              }}
            >
              Completed Requests
            </div>
            <Row xs={1} md={2} lg={3} className="g-4 pt-3 mb-5">
              {completedReq.map((_, idx) => (
                <Col key={idx}>
                  <Card
                    className="m-2 card-bg "
                    style={{ borderRadius: "16px" }}
                  >
                    <Card.Img variant="top" src={charity} />
                    <Card.Body className="text-light">
                      <Card.Title>{_.title}</Card.Title>
                      <Card.Text>{_.descriptionHash}</Card.Text>
                      <div style={{ textAlign: "left" }}>
                        Amount Raised:
                        <ProgressBar
                          animated
                          striped
                          variant={_.amountRaised == 0 ? "danger" : "success"}
                          now={
                            _.amountRaised == 0
                              ? 100
                              : (_.amountRaised / _.amount) * 100
                          }
                          label={`${_.amountRaised} ETH / ${_.amount} ETH`}
                        ></ProgressBar>
                      </div>
                      <div style={{ marginLeft: "4.5vw" }}>
                        <button
                          variant="primary"
                          className="btn-grad mt-3"
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
