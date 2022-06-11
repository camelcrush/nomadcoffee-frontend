import { useReactiveVar } from "@apollo/client";
import { faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";

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
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  margin-left: 15px;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <HeaderContainer>
      <Column></Column>
      <Column>
        <IconsContainer>
          <Icon>
            <Link to={routes.home}>
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Link>
          </Icon>
          {isLoggedIn ? (
            <>
              <Icon>
                <Link to={routes.add}>
                  <FontAwesomeIcon icon={faAdd} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <Avatar url={data?.me?.avatarUrl} />
              </Icon>
            </>
          ) : null}
        </IconsContainer>
      </Column>
    </HeaderContainer>
  );
};

export default Header;
