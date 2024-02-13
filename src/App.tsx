import { ApolloProvider } from "@apollo/client";
import { Global, css } from "@emotion/react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./client";

import Header from "@common/components/header/Header";
import TodoContext from "@todo/data/TodoContext";
import { ITodoFilters } from "@todo/data/TodoTypes";
import { Suspense, lazy, useState } from "react";

const Details = lazy(() => import("@/todo/pages/details/DetailsPage"));
const List = lazy(() => import("@/todo/pages/list/ListPage"));

const App = () => {
  const todoFilterState = useState<ITodoFilters>({});

  return (
    <ApolloProvider client={client}>
      <Global
        styles={css`
          a {
            text-decoration: none;
            color: unset;
          }

          html,
          body,
          #root {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <TodoContext.Provider value={todoFilterState}>
        <BrowserRouter>
          <div
            css={css`
              background-color: #e4f0e2;
              height: 100%;
            `}
          >
            <Header />
            <CssBaseline />
            <Container sx={{ bgcolor: "background.paper", minHeight: "300px" }}>
              <Suspense fallback={<CircularProgress />}>
                <Routes>
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/" element={<List />} />
                </Routes>
              </Suspense>
            </Container>
          </div>
        </BrowserRouter>
      </TodoContext.Provider>
    </ApolloProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
