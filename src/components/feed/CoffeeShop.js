import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 20px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
`;
const Location = styled.span`
  color: gray;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  margin-left: 20px;
`;
const Photo = styled.img`
  width: 100%;
  min-width: 500px;
  min-height: 500px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 20px;
`;
const Category = styled.span`
  color: ${(props) => props.theme.accent};
`;

const CoffeeShop = ({
  id,
  name,
  latitude,
  longitude,
  user,
  photos,
  categories,
}) => {
  return (
    <Container>
      <Header>
        <TitleBox>
          <Link to={`shop/${id}`}>
            <Title>{name}</Title>
          </Link>
          <Location>
            Latitude: {latitude}, Logitude: {longitude}
          </Location>
        </TitleBox>
        <UserBox>
          <Avatar url={user?.avatarUrl} />
          <Username>{user?.username}</Username>
        </UserBox>
      </Header>
      <Photo src={photos[0]?.url} />
      <CategoriesContainer>
        <Category>
          {categories.map((category) => category.name).join(" ")}
        </Category>
      </CategoriesContainer>
    </Container>
  );
};

export default CoffeeShop;
