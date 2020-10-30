import React from 'react';
import Card from './Card';
import api from '../utils/Api';
import Preloader from '../utils/Preloader';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    const promises = [api.getUserInfo(), api.getInitialCards()];
    Promise.all(promises)
      .then((res) => {
        const [userData, cardsList] = res;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsList);
        setIsLoading(false);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`))
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <button className="profile__button-avatar" id="avatar__button-edit" type="button" onClick={onEditAvatar} />
          <img className="profile__avatar" id="avatar" src={userAvatar} alt="Фото профиля" />
        </div>
        <div className="profile__info">
          <h1 className="profile__info_name">{userName}</h1>
          <button className="profile__info_button-edit" id="button-edit" name="button-edit" type="button" onClick={onEditProfile} />
          <h2 className="profile__info_about">{userDescription}</h2>
        </div>
        <button className="profile__button-add" id="button-add" name="button-add" type="button" onClick={onAddPlace} />
      </section>

      <section className="elements">
        <ul className="element__table">
          {isLoading
            ? <Preloader />
            : cards.map(data => {
              return (
                <Card key={data._id} data={data} onCardClick={onCardClick} />
              )
            })
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;
