import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import apiElement from '../utils/Api.js';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import {useState, useEffect} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Navigate, Route, Routes, Switch, useNavigate, useHistory } from 'react-router-dom';
import authApiElement from '../utils/AuthApi';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setloggedIn] = useState(false);
    const [email, setEmail] =useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
    const navigate = useNavigate();
    
    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    };

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    };
    
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
    }

    function handleCheckRegistr() {
        setIsSuccessPopupOpen(true);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsSuccessPopupOpen(false);
        setSelectedCard(null);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        !isLiked
        ? (apiElement.setLikeCard(card._id)
            .then((newCard) => {
                setCards((cards) => cards.map((item) => item._id === card._id ? newCard.data : item))
            })
            .catch((err) => console.log('Ошибка установки лайка.'))
        )
        : (apiElement.deleteLikeCard(card._id)
            .then((newCard) => {
            setCards((cards) => cards.map((item) => item._id === card._id ? newCard.data : item))
            })
            .catch((err) => console.log('Ошибка удаления лайка.'))
        );
    }

    function handleCardDelete(card) {
        apiElement.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((item) => {
                    return item._id != card._id
                }))
            })
            .catch((err) => console.log('Ошибка удаления карточки.'))
    }

    function handleUpdateUser(userInfo) {
        apiElement.loadUserInfo(userInfo)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка обновления данных пользователя.'))
    }

    function handleUpdateAvatar(userAvatar) {
        apiElement.setAvatar(userAvatar)
            .then((res) => {
                setCurrentUser(res.data);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка обновления аватара пользователя.'))
    }

    function handleAddPlaceSubmit(placeInfo) {
        apiElement.loadAddCard(placeInfo)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log('Ошибка новой карточки.'))
    }

    function handleRegister(email, password) {
        authApiElement.register(email, password)
            .then((res) => {
                setIsSuccess(true);
                navigate('/signin', {replace: true})
            })
            .catch((res) => {
                setIsSuccess(false);
                console.log('Ошибка регистрации');
            })
            .finally(() => setIsSuccessPopupOpen(true))
    }

    function setLogin() {
        setloggedIn(true);
    }

    function handleLogin (email, password) {
        authApiElement.login(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLogin();
                    setEmail(email);
                    navigate('/', {replace: true})
                } else {
                    console.log(() => console.log('Ошибка получения токена при входе'))
                }
            })
            .catch((res) => {
                setIsSuccess(false);
                setIsSuccessPopupOpen(true);
                console.log(res);
            })
            
    }

    function signOut(){
        localStorage.removeItem('token');
        setloggedIn(false);
        navigate('/signin', {replace: true});
    }

    useEffect(() => {
        apiElement.getUserInfo()
            .then((res) => setCurrentUser(res.data))
            .catch((err) => console.log('Ошибка получения данных пользователя.'))
    },[loggedIn])

    useEffect(() => {
        apiElement.getCardList()
            .then((res) => {
                setCards(res.data);   
            })
            .catch((err) => console.log('Ошибка получения карточек.'))
    },[loggedIn])

    useEffect(() => {
        function closeByEscape(evt) {
          if(evt.key === 'Escape') {
            closeAllPopups();
          }
        }
        if(isOpen) { // навешиваем только при открытии
          document.addEventListener('keydown', closeByEscape);
          //для чего следующий return не понятно, т.к. попап с картинкой при нажатии Ecs закрываются корректно без него
          return () => {
            document.removeEventListener('keydown', closeByEscape);
          }
        }
      }, [isOpen])

      useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            authApiElement.getContent(token)
                .then((res) => {
                    if (res) {
                        setloggedIn(true);
                        navigate('/', {replace: true});
                        setEmail(res.data.email);
                    }
                })
                .catch(() => console.log('Ошибка проверки токена'))
        }
      }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
                <div className="body">
                    <div className="page">
                        <Header handleSignOut={signOut} email={email} />
                            <Routes>
                                <Route element={loggedIn ? <Navigate to='/' replace='true' /> : <Navigate to='/signin' replace='true' />} />
                                <Route path='/signin' element={<Login handleLogin={handleLogin} />} />
                                <Route path='/signup' element={<Register handleRegister={handleRegister} />} />
                                <Route path='/' element={
                                    <ProtectedRoute 
                                        element={Main} 
                                        isEditAvatarPopupOpen={handleEditAvatarClick}
                                        isEditProfilePopupOpen={handleEditProfileClick}
                                        isAddPlacePopupOpen={handleAddPlaceClick}
                                        cardsArray={cards}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}
                                        loggedIn={loggedIn}
                                        />
                                    } />
                            </Routes>
                        <Footer />
                        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
                        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                        <ImagePopup cardElement={selectedCard} onClose={closeAllPopups}/>
                        <InfoTooltip isOpen={isSuccessPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess} />
                    </div>
                </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
