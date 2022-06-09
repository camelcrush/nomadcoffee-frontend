import { gql, useQuery } from "@apollo/client";
import CoffeeShop from "../components/feed/CoffeeShop";

const SEE_COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        id
        username
        avatarUrl
      }
      photos {
        url
      }
      categories {
        name
      }
      createdAt
      updatedAt
    }
  }
`;

const Home = () => {
  const { data } = useQuery(SEE_COFFEESHOPS_QUERY, {
    variables: {
      offset: 1,
    },
  });
  return (
    <div>
      {data?.seeCoffeeShops?.map((coffeeShop) => (
        <CoffeeShop key={coffeeShop.id} {...coffeeShop} />
      ))}
    </div>
  );
};

export default Home;
