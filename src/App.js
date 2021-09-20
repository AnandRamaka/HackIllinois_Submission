import "./App.css";
import Card from "./components/Card.js";
import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import ParticlesBg from "particles-bg";
import "./components/scrollbar.css";

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
        //console.log(res2)
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
        //console.log(cardData)
      })
      .catch(function (res) {
        console.log("Error detected");
      });
  }, []);

  var itemList;
  itemList = [" ", " ", " ", " ", " ", " ", " ", " "];

  if (cardData.length > 0) {
    //card = <Card name={cardData[0].name} description={cardData[0].description} photo={cardData[0].pic}  />
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
      <div class="myApp" style={{ marginTop: "5%" }}>
        <ParticlesBg type="square" bg={true} style={{ height: "100%" }} />
        <h1> Mentors </h1>
        <header>
          <div style={{ width: "100%", marginTop: "5%" }}>
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
