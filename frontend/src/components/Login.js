import AuthenticationForm from "./AuthenticationForm";

const Login = ({ onLogin, error }) => {
  return (
    <AuthenticationForm
      title="Вход"
      buttonText="Войти"
      authentication={onLogin}
      error={error}
    ></AuthenticationForm>
  );
};

export default Login;
