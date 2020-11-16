import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletionCardPopup({ isOpen, onClose, handleSubmit, card, isLoading, isolatePopup }) {

  function submitDeletion(evt) {
    evt.preventDefault();
    handleSubmit(card);
    onClose();
  }

  return (
    <PopupWithForm
      name='profile'
      title='Вы уверены?'
      buttonText={`${isLoading ? 'Удаление...' : 'Да'}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={submitDeletion}
      isolatePopup={isolatePopup}
    />
  )
}

export default DeletionCardPopup;
