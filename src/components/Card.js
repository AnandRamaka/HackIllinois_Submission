import React, { Component, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./Card.css";
import "bootstrap/dist/css/bootstrap.min.css";

const customStyles = {
  content: {
    width: "50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

function Card(props) {
  console.log(props.name);
  let img = props.photo;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="header">
      <div style={{}}>
        <div>
          <h1 class style={{ fontSize: "22px" }}>
            {" "}
            {props.name}{" "}
          </h1>
          <img
            class="myImg"
            src={img}
            onClick={handleShow}
            style={{
              borderWidth: 10,
              borderColor: "black",
              borderRadius: "20%",
              width: "70%",
              height: "70%",
              cursor: "pointer"
            }}
          />
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title> {props.name} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {props.description} </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default Card;
