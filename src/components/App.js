import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletionCardPopup from './DeletionCardPopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [isDeletionCardPopupOpen, setIsDeletionCardPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState({});

	function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
      const newCards = cards.map((data) => data._id === card._id ? newCard : data);
      setCards(newCards);
    })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter(item => item !== card);
      setCards(newCards);
    })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    api.setNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  React.useEffect(() => {
    setIsLoading(true);
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then((res) => {
        const [userData, cardsList] = res;
        setCurrentUser(userData)
        setCards(cardsList);
        setIsLoading(false);
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }, [])

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true);
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true);
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true);
	}

	function handleCardClick(data) {
		setSelectedCard(data);
		setIsImagePopupOpen(true);
	}

  function handleDeletionCardClick(data) {
    setSelectedCard(data);
    setIsDeletionCardPopupOpen(true);
  }

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletionCardPopupOpen(false);
		setSelectedCard({});
	}

	return (
	  <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />

          <Main
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletionCardClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            isLoading={isLoading}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <ImagePopup
            name='image'
            data={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
          />

          <DeletionCardPopup
            isOpen={isDeletionCardPopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleCardDelete}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
	);
}

export default App;
