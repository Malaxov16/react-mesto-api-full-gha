import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import authApiElement from "../utils/AuthApi";

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();
    
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        handleLogin(email, password);
    }

    return(
        <div className="login">
            <p className="login__title">Вход</p>
            <form className="login__form" onSubmit={handleSubmit}>
                <input required type="email" id="email" name="email" placeholder="Email" className="login__field" value={email || ''} onChange={handleChangeEmail}/>
                <input required type="password" id="password" name="password" placeholder="Пароль" className="login__field" value={password || ''} onChange={handleChangePassword} />
                <input type="submit" value={'Войти'} className="login__button"/>
            </form>
        </div>
        
        
        
    )
}

export default Login;