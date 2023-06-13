import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = ({
  isOpen,
  onClose,
  onConfirm,
  buttonText,
  disabledButton,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }
  return (
    <PopupWithForm
      name="popup_confirm"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      disabledButton={disabledButton}
      onSubmit={handleSubmit}
    />
  );
};

export default ConfirmPopup;
