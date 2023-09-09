import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    
    return(
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={props.isEditAvatarPopupOpen}/>
                <div className="profile__profile-info">
                <div className="profile__name-edit">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                    type="button"
                    aria-label="Редактировать"
                    className="profile__edit-button"
                    onClick={props.isEditProfilePopupOpen}
                    />
                </div>
                <p className="profile__job">{currentUser.about}</p>
                </div>
                <button
                type="button"
                aria-label="Добавить"
                className="profile__add-button"
                onClick={props.isAddPlacePopupOpen}
                />
            </section>
            <section className="elements">
                {
                    props.cardsArray.map((card) => {
                        return(
                        <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                        )
                    })
                }
            </section>
        </main>
    )
}

export default Main;