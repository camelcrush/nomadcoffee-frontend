import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import Layout from "./components/Layout";
import routes from "./routes";
import AddCoffeeShop from "./screens/AddCoffeeShop";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SeeCoffeeShop from "./screens/SeeCoffeeShop";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Routes>
              <Route
                path={routes.home}
                element={
                  isLoggedIn ? (
                    <Layout>
                      <Home />
                    </Layout>
                  ) : (
                    <Layout>
                      <Login />
                    </Layout>
                  )
                }
              />
              {!isLoggedIn ? (
                <Route
                  path={routes.signUp}
                  element={
                    <Layout>
                      <SignUp />
                    </Layout>
                  }
                />
              ) : null}
              {isLoggedIn ? (
                <Route
                  path="/add"
                  element={
                    <Layout>
                      <AddCoffeeShop />
                    </Layout>
                  }
                />
              ) : null}
              <Route
                path="/shop/:id"
                element={
                  <Layout>
                    <SeeCoffeeShop />
                  </Layout>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
