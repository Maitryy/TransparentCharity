import React from "react";
import "./Home.css";
import bg1 from "../Images/bg1.jpg";
import earth from "../Images/Earth.jpg";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <div>
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
                <Button variant="warning" href="/request">Create Request</Button>{" "}
              </div>
              <div className="col-3"></div>
            </div>
          </Container>
        </div>
      </div>
      <div>
        {/* <Container className="options pt-3 pb-3">
          <p>hey there</p>
        </Container> */}
      </div>
    </div>
  );
}
