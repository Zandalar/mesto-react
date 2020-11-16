import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading, isolatePopup }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText={`${isLoading ? 'Сохранение...' : 'Сохранить'}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isolatePopup={isolatePopup}
    >
      <input
        className="popup__field"
        id="profile__name"
        name="name"
        type="text"
        value={name || ''}
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        required
      />
      <span
        className="popup__field-error"
        id="profile__name-error"
      >
      </span>
      <input
        className="popup__field"
        id="profile__description"
        name="about"
        type="text"
        value={description || ''}
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        required
      />
      <span
        className="popup__field-error"
        id="profile__description-error"
      >
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
