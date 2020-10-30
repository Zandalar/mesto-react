import React from 'react';

function Card({ data, onCardClick }) {
	function setCardClick() {
		onCardClick(data)
	}

	return (
		<li className="element" id={data._id}>
			<button className="element__button-delete" type="button">
				<div className="element__button-delete_top" />
				<div className="element__button-delete_bottom" />
			</button>
			<img className="element__photo" src={data.link} alt={data.name} onClick={setCardClick} />
				<div className="element__description">
					<h2 className="element__title">{data.name}</h2>
					<div className="element__like-container">
						<button className="element__button-like" type="button" />
						<div className="element__like-count">{data.likes.length}</div>
					</div>
				</div>
		</li>
	)
}

export default Card;