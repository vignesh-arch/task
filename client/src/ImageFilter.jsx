import React, { useState } from "react";
import { Col, Button, Row, Container } from "react-bootstrap";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SERVER_ENDPOINT from "./config.js";
import { useImageContext } from "./ImageContext";

const ImageFilter = () => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const { setImageData } = useImageContext();

  function handleSubmit(e) {
    const data = {
      from,
      to,
    };
    fetch(`${SERVER_ENDPOINT}/getImages/${JSON.stringify(data)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setImageData(data.images))
      .catch((error) => {
        console.error("Error occurred while fetching data", error);
      });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <DateField
              label='From Date'
              value={from}
              onChange={(newValue) => setFrom(newValue)}
            />
          </Col>
          <Col xs={6} sm={4} md={3} lg={2}>
            <DateField
              label='To Date'
              value={to}
              onChange={(newValue) => setTo(newValue)}
            />
          </Col>
          <Col>
            <Button type='button' onClick={handleSubmit}>
              Apply
            </Button>
          </Col>
          <br />
        </Row>
      </Container>
    </LocalizationProvider>
  );
};

export default ImageFilter;
