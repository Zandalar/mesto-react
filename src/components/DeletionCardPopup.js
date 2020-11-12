import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletionCardPopup({ isOpen, onClose, handleSubmit, card }) {

  function submitDeletion(evt) {
    evt.preventDefault();
    handleSubmit(card);
    onClose();
  }

  return (
    <PopupWithForm
      name='profile'
      title='Вы уверены?'
      buttonText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitDeletion}
    />
  )
}

export default DeletionCardPopup;
