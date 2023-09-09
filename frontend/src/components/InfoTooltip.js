import React from "react";

const InfoTooltip = ({isOpen, isSuccess, onClose}) => {

    return(
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close-button popup__close-button_edit" onClick={onClose}/>
                <div className={`popup__actionstatus popup__actionstatus_${isSuccess ? 'true' : 'fail'}`}></div>
                <h2 className="popup__title popup__title_actionstatus">
                    {isSuccess ?
                    'Вы успешно зарегистрировались!' :
                    'Что-то пошло не так! Попробуйте еще раз.'}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;