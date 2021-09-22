import "./App.css";
import Logo2 from "./logo2.png";
import Card from "./components/Card.js";
import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import ParticlesBg from "particles-bg";
import "./scrollbar.css";
import { Nav, Navbar } from "react-bootstrap";

function App() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const responseURL =
      "https://api.hackillinois.org/upload/blobstore/mentors/";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    fetch(responseURL, requestOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res2) => {
        var cards_dict = [];
        var data = res2.data;
        for (var obj of data) {
          cards_dict.push({
            name: obj.firstName + " " + obj.lastName,
            pic: obj.profile,
            description: obj.description
          });
        }
        setCardData(cards_dict);
      })
      .catch(function (res) {
        console.log("Error detected");
      });
  }, []);

  var itemList;
  itemList = [" ", " ", " ", " ", " ", " ", " ", " "];

  if (cardData.length > 0) {
    itemList = cardData.map((item) => (
      <Col sm={3}>
        <ul>
          <Card
            name={item.name}
            style={{}}
            description={item.description}
            photo={item.pic}
          />
        </ul>
      </Col>
    ));
  }

  return (
    <>
      <div class="myApp" >
       
      <Navbar  bg="light" style={{padding:"1%"}}>
        <Nav className="container-fluid">
          <Nav.Item>
            <img src={Logo2} style={{ borderRadius:"30px",  position:"relative", width:"25%", height:"25%"}}  />
          </Nav.Item>
        </Nav>
      </Navbar>
        <ParticlesBg type="square" bg={true} style={{ height: "100%" }} />
        <h1 style={{ marginTop: "2.5%" }} > Mentors </h1>
        <header>
          <div style={{ width: "100%", marginTop: "2%" }}>
            <div
              className="scrollbar scrollbar-juicy-peach"
              style={{
                marginLeft: "10%",
                overflowX: "hidden",
                overflowY: "scroll",
                width: "80%",
                height: "600px"
              }}
            >
              <Container>
                <Row>{itemList.slice(0, 4)}</Row>
                <Row>{itemList.slice(4, 8)}</Row>
                <Row>{itemList.slice(8, 12)}</Row>
                <Row>{itemList.slice(12, 16)}</Row>
              </Container>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default App;
