import { useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import CoffeeShop from "../components/feed/CoffeeShop";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
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

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categories: String
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

const SeeCoffeeShop = () => {
  const { id } = useParams();
  const { data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id: parseInt(id) },
  });
  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };
  const [editCoffeeShoMutation, { loading }] = useMutation(
    EDIT_COFFEESHOP_MUTATION,
    {
      onCompleted,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    setError,
    setValue,
  } = useForm({
    mode: "onChange",
  });
  const onValid = (data) => {
    if (loading) {
      return;
    }
    editCoffeeShoMutation({
      variables: { ...data },
    });
  };
  useEffect(() => {
    if (data) {
      setValue("name", data.seeCoffeeShop.name || "");
      setValue("latitude", data.seeCoffeeShop.latitude || "");
      setValue("longitude", data.seeCoffeeShop.longitude || "");
      setValue(
        "categories",
        data?.seeCoffeeShop?.categories
          .map((category) => category.name)
          .join(" ") || ""
      );
    }
  }, [data, setValue]);
  return (
    <div>
      {data?.seeCoffeeShop ? <CoffeeShop {...data.seeCoffeeShop} /> : null}
      <form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("name", { required: "Name is required." })}
          name="name"
          type="text"
          placeholder="Name"
          onFocus={() => clearErrors()}
        />
        <FormError message={errors?.name?.message} />
        <Input
          {...register("latitude")}
          name="latitude"
          type="text"
          placeholder="Latitude"
        />
        <Input
          {...register("longitude")}
          name="longitude"
          type="text"
          placeholder="Longitude"
        />
        <Input
          {...register("categories")}
          name="categories"
          type="text"
          placeholder="Categories"
        />
        <Input {...register("photos")} name="photos" type="file" />
        <Button
          type="submit"
          value={loading ? "loading..." : "Add"}
          disabled={!isValid || loading}
          onSubmit={handleSubmit(onValid)}
        />
        <FormError message={errors?.result?.message} />
      </form>
    </div>
  );
};

export default SeeCoffeeShop;
