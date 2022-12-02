import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./FormModal.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import { Spinner } from "react-bootstrap";
import { NFTStorage, File } from "nft.storage";
import { Web3Storage } from "web3.storage";
import { useNavigate } from "react-router-dom";

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxZkE0QTU0OGY3MTJhOUNhYmZiQ2NhQWQ0YjVCNTA4ZjNjNzcxNzYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5NTAwMzU5NjksIm5hbWUiOiJjaGFyaXR5In0.l_yDJjEAp7FtM1DptkKmYFMdJchmzJQhiV7J5RJNZ90";

export default function FormModal(props) {
  let navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [documents, setDocuments] = useState(null);
  const [amt, setAmt] = useState("");
  const [loader, setLoader] = useState(false);

  const addRequest = (postTitle, postDesc, docHash, amt) => {
    var postID = new Date().valueOf();
    return new Promise((resolve, reject) => {
      let img = Math.floor(Math.random() * 6 + 1);
      props.contract.methods
        .addRequest(postID, postTitle, amt, postDesc, docHash, img)
        .send({ from: props.account, gas: 1000000 })
        .once("receipt", (receipt) => {
          console.log(receipt);
          resolve(receipt);
        })
        .once("error", (error) => {
          reject(error);
        });
    });
  };

  const onSubmitHandler = async (event) => {
    setLoader(true);
    const form = event.target;
    event.preventDefault();
    const file = documents[0];
    if (!file || file.length === 0) {
      return alert("No files selected");
    }
    const nfiles = [new File([file], "documents.pdf")];
    const client = new Web3Storage({ token: NFT_STORAGE_KEY });
    const cid = await client.put(nfiles);
    let url = "https://ipfs.io/ipfs/" + cid + "/documents.pdf";
    addRequest(postTitle, postDesc, url, amt)
      .then(() => {
        form.reset();
        setLoader(false);
        navigate("/myrequest");
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        alert("Couldn't process request");
      });
  };

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
        <Form className="text-light pt-2" onSubmit={onSubmitHandler}>
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
            <Form.Label className="text-light">Write A Brief Intro</Form.Label>
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
              Upload Documents and Detailed Description
            </Form.Label>
            <Form.Control
              type="file"
              accept="application/pdf"
              onChange={(event) => {
                setDocuments(event.target.files);
              }}
            />
          </Form.Group>
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
          {loader ? (
            <Spinner
              animation="border"
              role="status"
              style={{ marginLeft: "48%" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
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
              disabled={loader}
            >
              Submit
            </button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}
