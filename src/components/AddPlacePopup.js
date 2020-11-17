import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, isolatePopup }) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      buttonText={`${isLoading ? 'Загрузка...' : 'Создать'}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isolatePopup={isolatePopup}
    >
    <input
      className="popup__field"
      id="place__name"
      name="name"
      type="text"
      placeholder="Название"
      minLength="1"
      maxLength="30"
      value={title}
      onChange={handleTitleChange}
      required
    />
    <span
      className="popup__field-error"
      id="place__name-error">
    </span>
    <input
      className="popup__field"
      id="place__link"
      name="link"
      type="url"
      placeholder="Ссылка на картинку"
      value={link}
      onChange={handleLinkChange}
      required
    />
    <span
      className="popup__field-error"
      id="place__link-error">
    </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
