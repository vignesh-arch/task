import React from "react";
import { Card, Col, Button, } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useImageContext } from "./ImageContext";
import SERVER_ENDPOINT from "./config.js";

const ImageContainer = ({ imageData }) => {
  const { loadData } = useImageContext();

  function deleteImage() {
    fetch(`${SERVER_ENDPOINT}/deleteImage/${imageData.id}`, {
      method: "DELETE",
    })
      .then(response => {
        console.log("Issue Deleted Successfully");
        loadData();
      })
      .catch(error => {
        console.log("Error occurred while deleting image", error);
      });
  }
  return (
    <Col xs={6} sm={4}>
      <Card style={{ width: "18rem"}}>
        <Card.Img
          variant='top'
          src={`data:image/png;base64,${imageData.image}`}
          alt={imageData.caption.substr(0, 5)}
        />
        <Card.Body>
          <Card.Title>{imageData.caption.substr(0, 5)}</Card.Title>
          <Card.Text>{imageData.caption}</Card.Text>
          <Button variant='primary' onClick={deleteImage}>
            Delete
          </Button>{' '}
          <NavLink to={`/edit/${imageData.id}`}>
            Edit
          </NavLink>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ImageContainer;
