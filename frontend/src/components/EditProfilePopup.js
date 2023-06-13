import { useContext, useEffect } from "react";
import useForm from "./hooks/useForm";
import PopupWithForm from "./PopupWithForm";
import MyInput from "./UI/MyInput";
import CurrentUserContext from "../context/CurrentUserContext";

const EditProfilePopup = ({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
  disabledButton,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, handleChange } = useForm({
    name: currentUser.name,
    credentials: currentUser.about,
  });

  useEffect(() => {
    values.name = currentUser.name;
    values.credentials = currentUser.about;
    errors.name = "";
    errors.credentials = "";
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.credentials,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      disabledButton={disabledButton || errors.name || errors.credentials}
      onSubmit={handleSubmit}
      theme="bright"
    >
      <MyInput
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ""}
        onChange={handleChange}
        theme="bright"
        error={errors.name}
      />
      <MyInput
        type="text"
        name="credentials"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values.credentials || ""}
        onChange={handleChange}
        theme="bright"
        error={errors.credentials}
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
