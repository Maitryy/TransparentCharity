import Navbar from "react-bootstrap/Navbar";

import "./Navigation.css";

function Footer() {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="md"
        variant="dark"
        className="my-5 "
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
