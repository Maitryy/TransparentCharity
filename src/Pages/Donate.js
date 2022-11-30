import React from "react";
import "./Verify.css";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import charity from "../Images/charity.jpg";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ProgressBar from "react-bootstrap/ProgressBar";
import Web3 from "web3";

export default function Donate(props) {
  const [verifiedReq, setVerifiedReq] = useState([]);

  useEffect(() => {
    async function getData() {
      let verifiedReqLength = parseInt(
        await props.contract.methods.verifiedRequestsLength().call()
      );
      let tmp = [];
      for (let i = 0; i < verifiedReqLength; ++i) {
        let req = await props.contract.methods.verifiedRequests(i).call();
        console.log(req);
        if (req.status === 0) {
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
                  <InputGroup className="my-3">
                    <InputGroup.Text>ETH</InputGroup.Text>
                    <Form.Control aria-label="Amount (to the nearest dollar)" />
                    <Button
                      variant="warning"
                      onClick={() => {
                        props.contract.methods
                          .donate(_.id)
                          .send({
                            from: props.account,
                            // value: Web3.utils.toWei(1, "ether"),
                            value: 10,
                            gas: 1000000,
                          })
                          .then((rec) => {
                            console.log("HEHE?");
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
