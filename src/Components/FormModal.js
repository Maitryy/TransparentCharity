import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./FormModal.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import CloseButton from "react-bootstrap/CloseButton";
import { NFTStorage, File } from "nft.storage";

const NFT_STORAGE_KEY =
  "REPLAeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERCMTI3NzY0NjIwNjUyNjhDOTI2RjhiYjJENTNhQ0Y4Yzk3RjA4NDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2ODY4NjE5OTE3NCwibmFtZSI6IkNoYXJpdHkifQ.mkmi8ttdSecqBsk6lUG6XXpDiYoOQyDq1GEhAHvghIgCE_ME_WITH_YOUR_KEY";

const uploadReq = async (contract, postTitle, postDesc, docHash, amt) => {
  console.log(postTitle, postDesc);
  console.log(await contract.methods.addRequest(0, "t", 10, "t", "t").call());
};

export default function FormModal(props) {
  console.log(props.contract.methods);
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [docHash, setDocHash] = useState("");
  const [documents, setDocuments] = useState(null);
  const [amt, setAmt] = useState("");

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ marginLeft: "33%" }}
          className="text-light"
        >
          Add Required Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="text-light pt-2">
          <Form.Group className="my-3 mx-4" controlId="formHorizontalEmail">
            <Form.Label className="text-light">Enter Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              onChange={(event) => {
                setPostTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="my-3 mx-4"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label className="text-light">Enter Description</Form.Label>
            <InputGroup>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                placeholder="Description"
                onChange={(event) => {
                  setPostDesc(event.target.value);
                }}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formFileMultiple" className="my-3 mx-4">
            <Form.Label className="text-light">
              Upload supporting documents
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(event) => {
                setDocuments(event.target.files);
              }}
            />
          </Form.Group>
          {/* <Form.Group controlId="formFileMultiple" className="my-3 mx-4">
            <Form.Label className="text-light">
              Upload required images
            </Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              placeholder="Images"
            />
          </Form.Group> */}
          <Form.Group
            className="my-3 mx-4"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label className="text-light">Amount to be raised</Form.Label>
            <InputGroup>
              <InputGroup.Text>ETH</InputGroup.Text>
              <Form.Control
                onChange={(event) => {
                  setAmt(event.target.value);
                }}
              />
            </InputGroup>
          </Form.Group>
          <button
            variant="primary"
            type="submit"
            style={{
              marginLeft: "38%",
              marginTop: "5%",
              fontFamily: "Manrope",
              fontWeight: "700",
            }}
            className="btn-grad btn-sm"
            onClick={async (event) => {
              event.preventDefault();
              uploadReq(props.contract, postTitle, postDesc, docHash, amt);
            }}
          >
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
