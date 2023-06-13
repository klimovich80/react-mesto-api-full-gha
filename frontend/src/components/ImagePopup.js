import Popup from "./Popup";

const ImagePopup = ({ card, onClose, isOpen }) => {
  return (
    <Popup isOpen={isOpen} name="open-image" onClose={onClose}>
      {isOpen ? (
        <figure className="popup__figure">
          <button
            className="close-button"
            type="button"
            onClick={onClose}
          ></button>
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      ) : (
        <></>
      )}
    </Popup>
  );
};

export default ImagePopup;
