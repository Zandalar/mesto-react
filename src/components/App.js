import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from "./Footer";

function App() {
  return (
    <body>
    <div className="page">
      <div className="content">
        <Header />
        <Main />
        <Footer />






        <div className="popup" id="popup__profile">
          <div className="popup__container">
            <button className="popup__button-close" id="profile__button-close" type="button"/>
            <h2 className="popup__title">Редактировать профиль</h2>
            <form className="popup__form" id="profile__form" noValidate>
              <input className="popup__field" id="profile__name" name="name" type="text" minLength="2" maxLength="40"
                     required />
                <span className="popup__field-error" id="profile__name-error"></span>
                <input className="popup__field" id="profile__description" name="about" type="text" minLength="2"
                       maxLength="200" required />
                  <span className="popup__field-error" id="profile__description-error"></span>
                  <button className="popup__button-save" id="profile__button-save" type="submit">Сохранить</button>
            </form>
          </div>
        </div>

        <div className="popup" id="popup__place">
          <div className="popup__container">
            <button className="popup__button-close" id="place__button-close" type="button"/>
            <h2 className="popup__title">Новое место</h2>
            <form className="popup__form" id="place__form" noValidate>
              <input className="popup__field" id="place__name" name="name" type="text" placeholder="Название"
                     minLength="1" maxLength="30" required />
                <span className="popup__field-error" id="place__name-error"></span>
                <input className="popup__field" id="place__link" name="link" type="url" placeholder="Ссылка на картинку"
                       required />
                  <span className="popup__field-error" id="place__link-error"></span>
                  <button className="popup__button-save" id="place__button-save" type="submit">Создать</button>
            </form>
          </div>
        </div>

        <div className="popup" id="popup__image">
          <div className="popup__container_image">
            <img className="popup__image" src='#' alt='' />
              <h2 className="popup__title_image"></h2>
              <button className="popup__button-close" id="image__button-close" type="button"/>
          </div>
        </div>

        <div className="popup" id="popup__deletion">
          <div className="popup__container">
            <button className="popup__button-close" id="deletion__button-close" type="button"/>
            <h2 className="popup__title">Вы уверены?</h2>
            <button className="popup__button-confirm" id="deletion__button-confirm" type="button">Да</button>
          </div>
        </div>

        <div className="popup" id="popup__avatar">
          <div className="popup__container">
            <button className="popup__button-close" id="avatar__button-close" type="button"/>
            <h2 className="popup__title">Обновить аватар</h2>
            <form className="popup__form" id="avatar__form" noValidate>
              <input className="popup__field" id="avatar__link" name="avatar__link" type="url"
                     placeholder="Ссылка на картинку" required />
                <span className="popup__field-error" id="avatar__link-error"></span>
                <button className="popup__button-save" id="avatar__button-save" type="submit">Сохранить</button>
            </form>
          </div>
        </div>

        <template id="templateContainer">
          <li className="element">
            <button className="element__button-delete" type="button">
              <div className="element__button-delete_top"/>
              <div className="element__button-delete_bottom"/>
            </button>
            <img className="element__photo" />
              <div className="element__description">
                <h2 className="element__title"></h2>
                <div className="element__like-container">
                  <button className="element__button-like" type="button"/>
                  <div className="element__like-count"></div>
                </div>
              </div>
          </li>
        </template>
      </div>
    </div>
    </body>
  );
}

export default App;
