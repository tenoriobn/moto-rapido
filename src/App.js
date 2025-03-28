import React from "react";
import { Helmet } from "react-helmet";
import { AuthProvider } from "./contexts/auth";
import RoutesApp from "./routes";
import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </>
  );
};

export default App;
