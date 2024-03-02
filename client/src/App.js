import React from 'react';
import HomePage from "./HomePage";
import { BrowserRouter,Routes,Route, } from "react-router-dom";
import ImageUpdate from "./ImageUpdate";
import NavBar from "./NavBar.jsx";
import { ImageProvider } from './ImageContext.jsx';

function App() {
  return (
    <ImageProvider>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/edit/:id' element={<ImageUpdate />} />
        </Routes>
      </BrowserRouter>
    </ImageProvider>
  );
}

export default App;
