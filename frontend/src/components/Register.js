import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApiElement from "../utils/AuthApi";


const Register = ({handleRegister}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleRegister(email, password);
    }

    return(
        <div className="login">
            <p className="login__title">Регистрация</p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input required type="email" id="email" name="email" placeholder="Email" className="login__field" value={email} onChange={handleChangeEmail} />
                <input required type="password" id="password" name="password" placeholder="Пароль" className="login__field" value={password} onChange={handleChangePassword} />
                <input type="submit" value={'Зарегистрироваться'} className="login__button"/>
            </form>
            <div className="login__footer">
                <p className="login__footer-text">Уже зарегистрированы?&nbsp;</p>
                <Link to="/signin" className="login__footer-link">Войти</Link>
            </div>
        </div>
        
        
    )
}

export default Register;