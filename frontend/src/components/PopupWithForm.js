import React from "react";

const PopupWithForm = ({name, title, children, isOpen, titleButton, onClose, onSubmit}) => {
    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button type="button" aria-label="Закрыть" className="popup__close-button popup__close-button_edit" onClick={onClose}/>
                <form name={`popup-form-${name}`} className={`popup__form popup__form_${name}`} onSubmit={onSubmit}>
                    {children}
                    <input type="submit" value={titleButton} className="popup__button" />
                </form>
            </div>
        </div>
        
        
    )
}

export default PopupWithForm;