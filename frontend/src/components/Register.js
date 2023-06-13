import AuthenticationForm from "./AuthenticationForm";
import { Link } from "react-router-dom";

const Register = ({ onRegister, error }) => {
  return (
    <AuthenticationForm
      title="Регистрация"
      buttonText="Зарегестрироваться"
      authentication={onRegister}
      error={error}
    >
      <p className="authentication__paragraph">
        Уже зарегистрированы ?
        <Link className="navigation__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </AuthenticationForm>
  );
};

export default Register;
