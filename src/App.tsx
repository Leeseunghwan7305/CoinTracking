import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Circle from "./component/Circle/Circle";
import Router from "./routes/Router";
import { darkTheme, lightTheme } from "./component/theme/theme";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStyle } from "./reset";

function App() {
  const [isDark, setIsDark] = useState(false);
  function toggleButton() {
    setIsDark(!isDark);
  }
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleButton}>Toggle Mode</button>
        <GlobalStyle />
        <Router></Router>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}
export default App;
