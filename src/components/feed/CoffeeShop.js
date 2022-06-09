import styled from "styled-components";
import Avatar from "../Avatar";

const Container = styled.div``;
const Header = styled.div``;
const Title = styled.span``;
const Location = styled.span``;
const UserBox = styled.div``;
const Username = styled.span``;
const Photo = styled.img`
  width: 100%;
`;
const CategoriesContainer = styled.div``;
const Category = styled.span``;

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
        <Title>{name}</Title>
        <Location>
          {latitude} {longitude}
        </Location>
        <UserBox>
          <Avatar url={user?.avatarUrl} />
          <Username>{user?.username}</Username>
        </UserBox>
      </Header>
      <Photo src={photos[0]?.url} />
      <CategoriesContainer>
        <Category></Category>
      </CategoriesContainer>
    </Container>
  );
};

export default CoffeeShop;
