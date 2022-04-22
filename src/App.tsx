import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Circle from "./component/Circle/Circle";
import Router from "./routes/Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./reset";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router></Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}
export default App;
