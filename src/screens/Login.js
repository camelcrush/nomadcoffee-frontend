import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import routes from "../routes";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const onCompleted = (data) => {
    const {
      login: { ok, token, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username,
      password: location?.state?.password,
    },
  });
  const onValid = (data) => {
    if (loading) {
      return;
    }
    login({
      variables: { ...data },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Log In" />
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
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required." })}
            name="password"
            type="password"
            placeholder="Password"
            onFocus={() => clearErrors()}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "loading..." : "Log in"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        text="Sign Up"
      />
    </AuthLayout>
  );
};

export default Login;
