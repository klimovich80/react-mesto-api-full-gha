import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

const Card = ({ onCardDelete, onCardClick, onCardLike, card }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser._id === card.owner;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && "element__like_checked"
    }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  //render
  return (
    <li className="element">
      {isOwner && (
        <button
          className="element__trash"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__image"
        onClick={handleClick}
      />
      <h2 className="element__caption">{card.name}</h2>
      <button
        className={cardLikeButtonClassName}
        type="button"
        onClick={handleLikeClick}
      ></button>
      <p className="element__count">{card.likes.length}</p>
    </li>
  );
};

export default Card;
