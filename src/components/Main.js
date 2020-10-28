import React from 'react';

export default function Main() {
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <button className="profile__button-avatar" id="avatar__button-edit" type="button"/>
          <img className="profile__avatar" id="avatar" src="#" alt="Фото профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__info_name">Жак-Ив Кусто</h1>
          <button className="profile__info_button-edit" id="button-edit" name="button-edit" type="button"/>
          <h2 className="profile__info_about">Исследователь океана</h2>
        </div>
        <button className="profile__button-add" id="button-add" name="button-add" type="button"/>
      </section>

      <section className="elements">
        <ul className="element__table">
        </ul>
      </section>
    </main>
  )
}

// function handleEditAvatarClick
//
// function handleEditProfileClick
//
// function handleAddPlaceClick