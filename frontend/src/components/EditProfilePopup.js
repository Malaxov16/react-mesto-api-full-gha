import React from "react";
import {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
          });
    }

    return(
        <PopupWithForm name="edit" title="Редактировать профиль" titleButton="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" value={name || ''} id="popup__field-error_name" className="popup__field popup__field_type_name" name="name" placeholder="Имя" minLength={2} maxLength={40} onChange={handleChangeName} required="" />
            <span className="popup__field-error popup__field-error_name-error" />
            <input type="text" value={description || ''} className="popup__field popup__field_type_job" id="popup__field-error_job" name="about" placeholder="Профессия" minLength={2} maxLength={200} onChange={handleChangeDescription} required="" />
            <span className="popup__field-error popup__field-error_job-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;