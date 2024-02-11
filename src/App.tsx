import { ApolloProvider } from "@apollo/client";
import ErrorBoundary from "@common/components/errorBoundary/ErrorBoundary";
import { Typography } from "@mui/material";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Details from "./Todo/pages/Details/Details";
import List, { FallbackList } from "./Todo/pages/List/List";
import client from "./client";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <header>
          <Link to="/">
            <Typography variant="h2">Ma liste de choses à faire</Typography>
          </Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<FallbackList />}>
                <List />
              </ErrorBoundary>
            }
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
