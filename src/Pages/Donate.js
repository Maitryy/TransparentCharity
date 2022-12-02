import React from "react";
import "./Verify.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import charity1 from "../Images/charity1.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Web3 from "web3";
import getImage from "../Images/getImage";

export default function Donate(props) {
  const [verifiedReq, setVerifiedReq] = useState([]);
  const [donateAmt, setDonateAmt] = useState([]);

  useEffect(() => {
    async function getData() {
      let verifiedReqLength = parseInt(
        await props.contract.methods.verifiedRequestsLength().call()
      );
      let tmp = [];
      for (let i = 0; i < verifiedReqLength; ++i) {
        let req = await props.contract.methods.verifiedRequests(i).call();
        if (req.status === "0") {
          tmp.push(req);
        }
      }
      setVerifiedReq(tmp);
    }
    if (props.loaded) {
      getData();
    }
  }, [props.loaded]);

  return (
    <div className="verify-bg">
      <Container>
        <div
          style={{
            fontFamily: "Orbitron",
            fontWeight: "900",
            fontSize: "50px",
            marginTop: "5%",
            color: "white",
          }}
        >
          Donate Now
        </div>
        <Row xs={1} md={2} lg={3} className="g-4 pt-5">
          {verifiedReq.map((_, idx) => (
            <Col key={idx}>
              <Card
                className="m-2 card-bg "
                style={{
                  borderRadius: "16px",
                  boxShadow: " rgba(129, 124, 124, 0.3)",
                }}
              >
                <Card.Img
                  variant="top"
                  src={getImage(_.img)}
                  style={{
                    height: "370px",
                    width: "400px",
                    objectFit: "cover",
                  }}
                />
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
                  <InputGroup className="my-3">
                    <InputGroup.Text>ETH</InputGroup.Text>
                    <Form.Control
                      aria-label="Amount (to the nearest dollar)"
                      onChange={(event) => {
                        setDonateAmt(event.target.value);
                      }}
                    />
                    <Button
                      variant="warning"
                      onClick={() => {
                        props.contract.methods
                          .donate(_.id)
                          .send({
                            from: props.account,
                            value: donateAmt * Math.pow(10, 18),
                            gas: 1000000,
                          })
                          .then((rec) => {
                            console.log(rec);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      PAY NOW
                    </Button>
                  </InputGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}{" "}
        </Row>
      </Container>
    </div>
  );
}
