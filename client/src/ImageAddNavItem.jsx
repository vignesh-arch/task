import React, { useRef, useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Modal,
  Form,
  ButtonGroup,
  Button,
  Nav,
} from "react-bootstrap";

import SERVER_ENDPOINT from "./config.js";

import { Plus } from "react-bootstrap-icons";
import { useImageContext } from "./ImageContext.jsx";

const ImageAddNavItem = () => {
  const [showing, setShowing] = useState(false);
  const formRef = useRef(null);
  const { loadData } = useImageContext();

  const showModal = () => {
    setShowing(true);
  };

  const hideModal = () => {
    setShowing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    try {
      const response = await fetch(`${SERVER_ENDPOINT}/upload`, {
        method: "POST",
        body: formData,
      });
      hideModal();
      if (response.ok) {
        loadData();
        console.log("Image Uploaded Successfully");
      }
    } catch (err) {
      console.log("Error Occurred while Uploading Image", err);
    }
  };

  return (
    <React.Fragment>
      <Nav.Item onClick={showModal}>
        <OverlayTrigger
          delay={1000}
          position='left'
          overlay={<Tooltip id='upload_image'>Upload Image</Tooltip>}
        >
          <Button variant='outline-success'>
            Add Image
          </Button>
        </OverlayTrigger>
      </Nav.Item>
      <Modal show={showing} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef} name='imageAdd' onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Select Image</Form.Label>
              <Form.Control name='image' type='file' />
              <Form.Label>Caption</Form.Label>
              <Form.Control name='caption' type='text' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup>
            <Button type='button' onClick={handleSubmit} variant='primary'>
              Submit
            </Button>
            <Button variant='link' onClick={hideModal}>
              Cancel
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ImageAddNavItem;
