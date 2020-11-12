import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current
    });
  }

  function handleLinkChange(e) {
    avatarRef.current = e.target.value;
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
