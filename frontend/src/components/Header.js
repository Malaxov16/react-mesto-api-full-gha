import { React } from "react";
import logo from "../images/logo.svg"
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function Header({handleSignOut, email}) {

    return(
        <header className="header">
            <img
                src={logo}
                className="header__logo"
                alt="лого"
            />
            <Routes>
                <Route path="/signin" element={<Link to="/signup" className="header__link">Регистрация</Link>} />
                <Route path="/signup" element={<Link to="/signin" className="header__link">Войти</Link>} />
                <Route path='/' element={
                    <div className="header__panel">
                        <p className="header__email">{email}</p>
                        <Link to='/' className="header__link header__link_loggin" onClick={handleSignOut}>Выйти</Link>
                    </div>
                } />
            </Routes>
        </header>
    )
};

export default Header;