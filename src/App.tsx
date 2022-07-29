import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputCity from "./components/InputCity";
import Weather from "./components/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputCity />} />
        <Route path="weather/:city" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
