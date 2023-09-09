import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id; //проверяет является ли текущий пользователь владельцем карточки
    const isLiked = card.likes.some(i => i._id === currentUser._id); //проверяет имеется ли в списке лайков текущий пользователь
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    function handleClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleCardDelete() {
        onCardDelete(card);
    }

    return(
        <article className="element" >
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            {isOwn && <button type="button" aria-label="Удалить" className="element__trash" onClick={handleCardDelete}></button>}
            <div className="element__footer">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="element__like-counter">{0 || card.likes.length}</p>
                </div>
            </div>
        </article>
            
    )
};

export default Card;