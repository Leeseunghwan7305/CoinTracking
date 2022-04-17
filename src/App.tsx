import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Circle from "./component/Circle/Circle";
import Router from "./routes/Router";
import { GlobalStyle } from "./reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router></Router>
    </>
  );
}
export default App;
