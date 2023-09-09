import React from "react";

function ImagePopup({cardElement, onClose}) {
        return(
            <div className={`popup popup_image ${cardElement ? 'popup_opened' : ''}`}>
                    <div className="popup__image-container">
                    <img className="popup__image" src={cardElement?.link} alt={cardElement?.name} />
                    <button
                        type="button"
                        aria-label="Закрыть"
                        className="popup__close-button popup__close-button_image"
                        onClick={onClose}
                    />
                    <h3 className="popup__image-title">{cardElement?.name}</h3>
                    </div>
                </div>
        )
}

export default ImagePopup;