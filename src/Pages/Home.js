import React from "react";
import { useState } from "react";
import "./Home.css";
import bg1 from "../Images/bg1.jpg";
import earth from "../Images/Earth.jpg";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import FormModal from "../Components/FormModal";

export default function Home(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        client={props.client}
        contract = {props.contract}
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
          </Container>
        </div>
      </div>
    </div>
  );
}
