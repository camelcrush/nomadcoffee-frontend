import { faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
`;
const Column = styled.div``;
const Icon = styled.span`
  margin-left: 15px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Column></Column>
      <Column>
        <Icon>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </Icon>
        <Icon>
          <Link to={routes.add}>
            <FontAwesomeIcon icon={faAdd} size="lg" />
          </Link>
        </Icon>
      </Column>
    </HeaderContainer>
  );
};

export default Header;
