import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id="popup__profile">
      <div className="popup__container">
        <button className="popup__button-close" id="profile__button-close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name}>
          {children}
          <button className="popup__button-save" id="profile__button-save" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;