import regOkImage from "../images/RegistrationOk.png";
import regFailedImage from "../images/RegistrationFailed.png";
import Popup from "./Popup";

const InfoTooltip = ({ isOpen, onClose, name, success }) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <img
        src={success ? regOkImage : regFailedImage}
        alt="иконка"
        className="registration__icon"
      />
      <h2 className="popup__title registration__title">
        {success
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
