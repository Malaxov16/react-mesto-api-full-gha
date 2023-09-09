import React from "react";
import {useState, useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        }
        )
    }

    useEffect(() =>{
        setName('');
        setLink('');
    }, [isOpen]
    )

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    return(
        <PopupWithForm name="add" title="Новое место" titleButton="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" value={name} id="popup__field-error_title" className="popup__field popup__field_type_title" name="name" placeholder="Название" minLength={2} maxLength={30} required="" onChange={handleChangeName} />
            <span className="popup__field-error popup__field-error_title-error" />
            <input type="url" value={link} id="popup__field-error_link" className="popup__field popup__field_type_link" name="link" placeholder="Ссылка на картинку" required="" onChange={handleChangeLink} />
            <span className="popup__field-error popup__field-error_link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;