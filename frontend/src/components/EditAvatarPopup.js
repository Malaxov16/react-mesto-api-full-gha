import React from "react";
import {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditAvatarPopup =({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        })
    }

    useEffect(() =>{
        avatarRef.current.value = '';
    }, [isOpen]
    )


    return(
        <PopupWithForm name="avatar-edit" title="Обновить аватар" titleButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="url" ref={avatarRef} id="popup__field-error_avatar" className="popup__field popup__field_type_link" name="link" placeholder="Ссылка на аватар" required="" />
            <span className="popup__field-error popup__field-error_avatar-error" /> 
        </PopupWithForm>
    )
}

export default EditAvatarPopup;