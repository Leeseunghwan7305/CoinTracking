import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Circle from "./component/Circle/Circle";
import Router from "./routes/Router";
import { darkTheme, lightTheme } from "./component/theme/theme";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./reset";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router></Router>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}
export default App;
