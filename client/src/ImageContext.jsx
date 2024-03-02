import React, { createContext, useContext, useState, useEffect } from "react";
import SERVER_ENDPOINT from "./config.js";

const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadData();
  }, [page]);

  function loadData() {
    const data = {
      page,
    };
    fetch(`${SERVER_ENDPOINT}/getImages/${JSON.stringify(data)}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setImageData(data.images);
        setPages(data.pages);
      })
      .catch((error) => console.log("Error occurred while fetching", error));
  }

  return (
    <ImageContext.Provider value={{ imageData, loadData, setImageData, setPage, pages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => useContext(ImageContext);
