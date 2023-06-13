import MyInput from "./UI/MyInput";
import useForm from "./hooks/useForm";

const AuthenticationForm = ({ children, ...props }) => {
  const { values, errors, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.authentication({
      password: values.password,
      email: values.email,
    });
  }
  return (
    <div className="authentication__container">
      <h2 className="authentication__title">{props.title}</h2>
      <form className="authentication__form" onSubmit={handleSubmit}>
        <MyInput
          type="email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          theme="dark"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <MyInput
          type="password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          theme="dark"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <button
          type="submit"
          className="authentication__button"
          aria-label={props.buttonText}
        >
          {props.buttonText}
        </button>
      </form>
      {children}
    </div>
  );
};

export default AuthenticationForm;
