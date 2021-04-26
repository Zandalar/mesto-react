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
  const [isLoading, setIsLoading] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);

	const [loggedIn, setLoggedIn] = React.useState(false);

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
	  setIsLoading(true);
    api.setUserInfo(user)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true);
    api.editAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.setNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        setIsLoading(false);
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
      })
      .catch((err) => console.log(`Что-то пошло не так :( ${err}`))
      .finally(() => setIsLoading(false))
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

  function handleEscClick(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletionCardPopupOpen(false);
		setSelectedCard({});
	}

  function isolatePopup(evt) {
    evt.stopPropagation();
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('keydown', handleEscClick);
    }
  })

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
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            isolatePopup={isolatePopup}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            isolatePopup={isolatePopup}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            isolatePopup={isolatePopup}
          />
          <ImagePopup
            name='image'
            data={selectedCard}
            onClose={closeAllPopups}
            isOpen={isImagePopupOpen}
            isolatePopup={isolatePopup}
          />
          <DeletionCardPopup
            isOpen={isDeletionCardPopupOpen}
            onClose={closeAllPopups}
            handleSubmit={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading}
            isolatePopup={isolatePopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
	);
}

export default App;
