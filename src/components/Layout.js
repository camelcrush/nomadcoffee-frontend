import styled from "styled-components";
import Header from "./Header";

const Container = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
  padding: 20px 10px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
