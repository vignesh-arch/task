import React, { useEffect, useState } from "react";
import { Button, Image, Form, Container, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SERVER_ENDPOINT from "./config.js";
import { useImageContext } from "./ImageContext.jsx";

const serverEndPoint = process.env.SERVER_ENDPOINT || "http://localhost:4000";

const ImageUpdate = () => {
  const [imageData, setImageData] = useState({});
  const [caption, setCaption] = useState("");
  const { loadData } = useImageContext();

  useEffect(() => {
    loadImageData();
  },[])

  const { id } = useParams();

  const loadImageData = () => {
    const body = {
      id,
    };
    fetch(`${SERVER_ENDPOINT}/getImages/${JSON.stringify(body)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImageData({ ...data.images[0] });
        setCaption(data.images[0].caption);
      })
      .catch((error) => {
        console.error("Error occurred while fetching data", error);
      });
  };

  function handleUpdate(e) {
    e.preventDefault();
    const data = {
      id,
      changes: {
        caption,
      },
    };
    fetch(`${serverEndPoint}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        loadData();
        console.log("Updated Successfully");
      })
      .catch((error) => {
        console.error("Error occurred while updating info", error);
      });
  }

  return (
    <Container>
      <Form onSubmit={handleUpdate}>
        <Form.Group>
          <Stack direction='vertical' gap={3}>
            <Image
              style={{ width: "18rem", objectFit: "cover" }}
              fluid
              src={`data:image/png;base64,${imageData.image}`}
            />
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type='text'
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </Stack>
        </Form.Group>
        <Button type='submit'>Update</Button>
      </Form>
    </Container>
  );
};

export default ImageUpdate;
