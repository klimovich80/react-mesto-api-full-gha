import { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { api } from "../utils/Api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CurrentUserContext from "../context/CurrentUserContext";
import ConfirmPopup from "./ConfirmPopup.js";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute";
import { getUserInfo, login, register } from "../utils/AuthApi";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isRegisteredPopupOpen, setRegisteredPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState(null);
  const [cardToDelete, setCardToDelete] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isRegisterSuccess, setRegisterSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }
    getUserInfo(token)
      .then((data) => {
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  useEffect(() => { }, [isLoading]);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setConfirmPopupOpen(true);
  }

  function handleConfirmCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== cardToDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(e) {
    setIsLoading(true);
    api
      .editProfileInfo(e.name, e.about)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(user) {
    setIsLoading(true);
    api
      .editProfileAvatar(user.avatar)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .postNewCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleRegistration(data) {
    register(data.password, data.email)
      .then((res) => {
        setRegisterSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setRegisterSuccess(false);
      })
      .finally(() => setRegisteredPopupOpen(true));
  }

  function handleLogin({ password, email }) {
    login(password, email)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setToken(res.token);
      })
      .catch((err) => console.log(err));
  }

  function handleSignout(e) {
    e.preventDefault();
    setToken(null);
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setImagePopupOpen(false);
    setRegisteredPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <>
                    <Header
                      title={
                        <>
                          {userEmail}
                          <Link
                            className="navigation__link"
                            to="./sign-in"
                            onClick={handleSignout}
                          >
                            Выйти
                          </Link>
                        </>
                      }
                    />
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onPlaceAdd={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      cards={cards}
                    />
                  </>
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header
                  title={
                    <Link className="navigation__link" to="/sign-in">
                      Вход
                    </Link>
                  }
                />
                <Register onRegister={handleRegistration} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header
                  title={
                    <Link className="navigation__link" to="/sign-up">
                      Регистрация
                    </Link>
                  }
                />
                <Login onLogin={handleLogin} />
              </>
            }
          />
        </Routes>
        <Footer />
        {/* edit profile popup */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          disabledButton={isLoading}
        />
        {/* edit avatar popup */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          disabledButton={isLoading}
        />
        {/* confirm action popup */}
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleConfirmCardDelete}
          buttonText={isLoading ? "Удаление..." : "Да"}
          disabledButton={isLoading}
        />
        {/* add card popup */}
        <AddPlacePopup
          name="add-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText={isLoading ? "Создание..." : "Создать"}
          disabledButton={isLoading}
        />
        {/* opened card popup*/}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        {/*Authentication tooltip popup*/}
        <InfoTooltip
          name="registration"
          isOpen={isRegisteredPopupOpen}
          onClose={closeAllPopups}
          success={isRegisterSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
