import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Navigation.css";
import { Link, NavLink } from "react-router-dom";

function Navigation(props) {
  const [walletAdd, setWalletAdd] = useState("");
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant="dark"
      className="mx-5 my-2 custom-nav"
    >
      <Container>
        <Navbar.Brand>
          {" "}
          <NavLink
            to="/"
            style={{
              fontFamily: "Orbitron",
              fontWeight: "200",
              fontSize: "20px",
              color: "white",
              textDecoration: "none",
            }}
          >
            {" "}
            Not-Milaap{" "}
          </NavLink>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {
              <NavLink
                to="/verify"
                variant="dark"
                style={{
                  color: "lightblue",
                  fontFamily: "Quantico",
                  marginRight: "20px",
                  textDecoration: "none",
                  paddingTop: "8px",
                }}
              >
                {" "}
                Verify Requests
              </NavLink>
            }
            <NavLink
              to="/myrequest"
              variant="dark"
              style={{
                color: "lightblue",
                fontFamily: "Quantico",
                marginRight: "20px",
                textDecoration: "none",
                paddingTop: "8px",
              }}
            >
              {" "}
              View Request
            </NavLink>
            &nbsp;
            <Button
              variant="outline-info"
              style={{
                fontFamily: "Quantico",
                fontWeight: "400",
                borderRadius: "50px",
              }}
              // disabled={props.wallet !== ""}
              onClick={() => {
                props.connectWallet().then((add) => {
                  setWalletAdd(add);
                  props.setWalletAdd(add);
                });
              }}
            >
              {walletAdd !== ""
                ? walletAdd.slice(0, 5) +
                  "..." +
                  walletAdd.slice(walletAdd.length - 3, walletAdd.length)
                : "Connect Wallet"}
            </Button>{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
