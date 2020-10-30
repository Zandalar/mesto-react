import React from "react";

function PopupWithImage({isOpen, name, cardData, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} id="popup__image">
      <div className="popup__container_image">
        <img className="popup__image" src={cardData.link} alt={cardData.name} />
        <h2 className="popup__title_image">{cardData.name}</h2>
        <button className="popup__button-close" id="image__button-close" type="button" onClick={onClose} />
      </div>
    </div>
  )
}

export default PopupWithImage;