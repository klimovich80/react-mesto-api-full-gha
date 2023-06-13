import PopupWithForm from "./PopupWithForm";
import MyInput from "./UI/MyInput";
import useForm from "./hooks/useForm";
import { useEffect } from "react";

const AddPlacePopup = ({
  name,
  title,
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
  disabledButton,
}) => {
  const { values, errors, handleChange } = useForm({
    name: "",
    link: "",
  });

  useEffect(() => {
    values.name = "";
    values.link = "";
    errors.name = "";
    errors.link = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name={name}
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      disabledButton={disabledButton || errors.name || errors.link}
      onSubmit={handleSubmit}
    >
      <MyInput
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        theme="bright"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
      />
      <MyInput
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        theme="bright"
        required
        value={values.link}
        onChange={handleChange}
        error={errors.link}
      />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
