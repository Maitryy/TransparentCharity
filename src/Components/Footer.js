import Navbar from "react-bootstrap/Navbar";

import "./Navigation.css";

function Footer() {
  return (
    <div style={{ marginBottom: "80px"}}>
      <Navbar
      collapseOnSelect
      expand="md"
      variant="dark"
      className="mx-5 my-2 custom-nav "
      style={{ justifyContent: "center" }}
      fixed="bottom"
    >
      <div className="text-light p-3">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-light">Not-Milaap</a>
      </div>
    </Navbar>
    </div>
  );
}

export default Footer;
