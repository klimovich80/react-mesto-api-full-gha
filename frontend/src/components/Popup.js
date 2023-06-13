import usePopupClose from "./hooks/usePopupClose";

const Popup = ({ isOpen, name, onClose, children }) => {
  usePopupClose(isOpen, onClose);

  const isInfoTooltip = name === "registration";
  const isImagePopup = name === "open-image";

  return (
    <div
      className={
        isOpen ? `popup popup_${name} popup_active` : `popup popup_${name}`
      }
    >
      <div
        className={
          isImagePopup
            ? "popup__overlay popup__overlay_image"
            : "popup__overlay"
        }
      ></div>
      {isImagePopup ? (
        <>{children}</>
      ) : (
        <div
          className={
            isInfoTooltip
              ? "popup__container registration__container"
              : "popup__container"
          }
        >
          <button
            className="close-button"
            type="button"
            onClick={onClose}
          ></button>
          {children}
        </div>
      )}
    </div>
  );
};

export default Popup;
