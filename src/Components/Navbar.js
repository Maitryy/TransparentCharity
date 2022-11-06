import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import "./Navigation.css";
import {Link} from 'react-router-dom'

function Navigation(props) {
  return (
      <Navbar collapseOnSelect expand="md" variant="dark" className="mx-5 my-2 custom-nav">
        <Container>
          <Navbar.Brand href="/"> <div
            style={{
              fontFamily: "Orbitron",
              fontWeight: "200",
              fontSize: "20px",
              color: "white"
            }}
          > Not-Milaap </div> </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link eventKey={2} href="/verify" variant="dark" style={{color: "lightblue", fontFamily: "Quantico", marginRight: "10px"}}> Verify Requests</Nav.Link>
                &nbsp;
                <Button variant="outline-info" style={{fontFamily: "Quantico", fontWeight: "400", borderRadius: "50px"}}>
                  {props.wallet !== "" ? props.wallet.slice(0,5)+"..."+props.wallet.slice(props.wallet.length -3, props.wallet.length) : "Connect Wallet"}
                </Button>{" "}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default Navigation;
