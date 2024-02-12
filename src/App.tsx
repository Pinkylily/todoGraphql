import { ApolloProvider } from "@apollo/client";
import { Global, css } from "@emotion/react";
import { CircularProgress, Typography } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import client from "./client";

import { Suspense, lazy } from "react";

const Details = lazy(() => import("./Todo/pages/Details/Details"));
const List = lazy(() => import("./Todo/pages/List/List"));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Global
        styles={css`
          a {
            text-decoration: none;
            color: unset;
          }
        `}
      />

      <BrowserRouter>
        <header
          css={css`
            margin-bottom: 20px;
          `}
        >
          <Link to="/">
            <Typography variant="h2">Ma liste de choses à faire</Typography>
          </Link>
        </header>
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<List />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
