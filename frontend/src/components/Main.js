import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import Card from "./Card.js";

function Main({
  onEditProfile,
  onPlaceAdd,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__cover">
            <button onClick={onEditAvatar} className="avatar-button"></button>
          </div>
          <img
            src={currentUser.avatar}
            alt="Ававтарка"
            className="profile__avatar"
          />
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            className="profile__edit-button"
            type="button"
          ></button>
        </div>
        <button
          onClick={onPlaceAdd}
          className="profile__add-button"
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards?.map((card) => (
            <Card
              onCardDelete={onCardDelete}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
