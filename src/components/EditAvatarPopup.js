import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, isolatePopup }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current
    });
  }

  function handleLinkChange(evt) {
    avatarRef.current = evt.target.value;
  }

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
        id="avatar__link"
        name="avatar__link"
        type="url"
        placeholder="Ссылка на картинку"
        onChange={handleLinkChange}
        required
      />
      <span
        className="popup__field-error"
        id="avatar__link-error"
      >
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
