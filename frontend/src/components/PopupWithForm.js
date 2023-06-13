import Popup from "./Popup";

const PopupWithForm = ({
  children,
  isOpen,
  onClose,
  name,
  title,
  onSubmit,
  buttonText,
  disabledButton,
}) => {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={`${name}Form`} onSubmit={onSubmit}>
        {children}
        <button
          type="submit"
          className="popup__button"
          aria-label={buttonText}
          disabled={disabledButton}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
