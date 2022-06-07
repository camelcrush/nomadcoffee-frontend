import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  width: 100%;
  padding: 20px 40px;
  text-align: center;
  a {
    font-weight: 600;
    color: ${(props) => props.theme.accent};
  }
`;

const BottomBox = ({ cta, link, text }) => {
  return (
    <Container>
      <span>{cta} </span>
      <Link to={link}>{text}</Link>
    </Container>
  );
};

export default BottomBox;
