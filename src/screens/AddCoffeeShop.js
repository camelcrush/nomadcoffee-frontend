import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import Button from "../components/auth/Button";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";

const CREATE_COFFESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $file: Upload
    $categories: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      file: $file
      categories: $categories
    ) {
      id
      name
    }
  }
`;

const AddCoffeeShop = () => {
  const onCompleted = (data) => {
    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };
  const [addCoffeeShopMutation, { loading }] = useMutation(
    CREATE_COFFESHOP_MUTATION,
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
  } = useForm({ mode: "onChange" });
  const onValid = (data) => {
    if (loading) {
      return;
    }
    addCoffeeShopMutation({
      variables: { ...data, photos: data?.photos[0] },
    });
  };
  return (
    <div>
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

export default AddCoffeeShop;
