import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState({});

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
		setIsImagePopupOpen(true)
	}

	function closeAllPopups() {
		setIsEditProfilePopupOpen(false);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
		setSelectedCard({});
	}

	return (
		<div className="page">
			<div className="content">
				<Header />

				<Main
					onEditProfile={handleEditProfileClick}
					onEditAvatar={handleEditAvatarClick}
					onAddPlace={handleAddPlaceClick}
					onCardClick={handleCardClick}
				/>

				<Footer />

				<PopupWithForm
					name='profile'
					title='Редактировать профиль'
					buttonText='Сохранить'
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					children={
						<>
							<input className="popup__field" id="profile__name" name="name" type="text" minLength="2" maxLength="40"
										 required />
							<span className="popup__field-error" id="profile__name-error"></span>
							<input className="popup__field" id="profile__description" name="about" type="text" minLength="2"
										 maxLength="200" required />
							<span className="popup__field-error" id="profile__description-error"></span>
						</>
					}
				/>

				<PopupWithForm
					name='place'
					title='Новое место'
					buttonText='Создать'
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					children={
						<>
							<input className="popup__field" id="place__name" name="name" type="text" placeholder="Название"
										 minLength="1" maxLength="30" required />
							<span className="popup__field-error" id="place__name-error"></span>
							<input className="popup__field" id="place__link" name="link" type="url" placeholder="Ссылка на картинку"
										 required />
							<span className="popup__field-error" id="place__link-error"></span>
						</>
					}
				/>

				<PopupWithForm
					name='avatar'
					title='Обновить аватар'
					buttonText='Сохранить'
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					children={
						<>
							<input className="popup__field" id="avatar__link" name="avatar__link" type="url"
										 placeholder="Ссылка на картинку" required />
							<span className="popup__field-error" id="avatar__link-error"></span>
						</>
					}
				/>

				<ImagePopup
          name='image'
					data={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
				/>
			</div>
		</div>
	);
}

export default App;
