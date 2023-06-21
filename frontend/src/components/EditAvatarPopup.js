
import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import MyInput from "./UI/MyInput";
import useForm from "./hooks/useForm";

const EditAvatarPopup = ({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
  disabledButton,
}) => {
  const avatarLinkRef = useRef();
  const { errors, handleChange } = useForm({
    avatar: "",
  });

  useEffect(() => {
    avatarLinkRef.current.value = "";
    errors.avatar = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLinkRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      disabledButton={disabledButton || errors.avatar}
      onSubmit={handleSubmit}
      theme="bright"
    >
      <MyInput
        ref={avatarLinkRef}
        type="url"
        minLength="2"
        name="avatar"
        placeholder="ссылка на аватар"
        required
        theme="bright"
        onChange={handleChange}
        error={errors.avatar}
      />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
