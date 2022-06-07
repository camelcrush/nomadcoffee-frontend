import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $email: String!
    $name: String!
    $location: String
  ) {
    createAccount(
      username: $username
      password: $password
      email: $email
      name: $name
      location: $location
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", { message: error });
    }
    navigate("/", { state: { message: "Plz. Log In", username, password } });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
    clearErrors,
  } = useForm({ mode: "onChange" });
  const onValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: { ...data },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faCoffee} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", { required: "Username is required." })}
            name="username"
            type="text"
            placeholder="Username"
            onFocus={() => clearErrors()}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
            onFocus={() => clearErrors()}
          />
          <FormError message={errors?.password?.message} />
          <Input
            {...register("email", { required: "Email is required." })}
            name="email"
            type="email"
            placeholder="Email"
            onFocus={() => clearErrors()}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("name", { required: "Name is required." })}
            name="name"
            type="text"
            placeholder="Name"
            onFocus={() => clearErrors()}
          />
          <FormError message={errors?.name?.message} />
          <Input
            {...register("location")}
            name="location"
            type="text"
            placeholder="Location"
            onFocus={() => clearErrors()}
          />
          <Button
            type="submit"
            value={loading ? "loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="Do you have an Account ?"
        link={routes.home}
        text="Log In"
      />
    </AuthLayout>
  );
};

export default SignUp;
