class Api {
    constructor(url, headers) {
        this._url = url;
        //this._headers = headers;
    }

    //метод проверки ответа от сервера
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status)
    }

    //метод вызывает fetch с параметрами
    _request(urlBase, options) {
        return fetch(`${this._url}${urlBase}`, options).then(this._checkResponse)
    }

    //метод получает информацию о пользователе с сервера
    getUserInfo () {
        this._token = this._getLocalToken();
        return this._request('/users/me', {
            headers: {
                'authorization': `Bearer ${this._token}`,
                'content-type': 'application/json'
                }
            })
    };

    //метод получает список карточек, загруженных пользователями, с сервера
    getCardList () {
        this._token = this._getLocalToken();
        return this._request('/cards', {
            headers: {
                'authorization': `Bearer ${this._token}`,
                'content-type': 'application/json'
                }
            })
    };

    //метод отправляет на сервер данные о пользователе
    loadUserInfo (userInfo) {
        this._nameUser = userInfo.name;
        this._aboutUser = userInfo.about;
        this._token = this._getLocalToken();
        return this._request('/users/me',
            {
                method: 'PATCH',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    },
                body:  JSON.stringify({
                    name: this._nameUser,
                    about: this._aboutUser
                })
            })
    };

    //метод загружает новую карточку, добавленную пользователем, на сервер
    loadAddCard (cardInfo) {
        this._name = cardInfo.name;
        this._link = cardInfo.link;
        this._token = this._getLocalToken();
        return this._request('/cards',
            {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    },
                body: JSON.stringify({
                    name: this._name,
                    link: this._link
                })
            }
        )
    };

    //метод удаляет карточку с сервера
    deleteCard (cardId) {
        this._cardId = cardId;
        this._token = this._getLocalToken();
        return this._request(`/cards/${this._cardId}`, 
            {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    }
            }
        )
    };

    //метод установки лайка
    setLikeCard (cardId) {
        this._cardId = cardId;
        this._token = this._getLocalToken();
        return this._request(`/cards/${this._cardId}/likes`, 
            {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    }
            }
        )
    }

    //метод удаления лайка
    deleteLikeCard (cardId) {
        this._cardId = cardId;
        this._token = this._getLocalToken();
        return this._request(`/cards/${this._cardId}/likes`, 
            {
                method: 'DELETE',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    }
            }
        )
    };

    //метод загружает на сервер автар
    setAvatar (userAvatar) {
        this._linkAvatar = userAvatar.avatar;
        this._token = this._getLocalToken();
        return this._request(`/users/me/avatar`,
            {
                method: 'PATCH',
                headers: {
                    'authorization': `Bearer ${this._token}`,
                    'content-type': 'application/json'
                    },
                body: JSON.stringify({
                    avatar: this._linkAvatar
                })
            }
        )
    }

    // метод получает токен из локального хранилища
    _getLocalToken() {
        return localStorage.getItem('token');
    }

}

const url ='http://api.project-mesto.nomoredomainsicu.ru';
// const cohortId = 'cohort-66';
const headers = {
    'authorization': `Bearer ${localStorage.getItem('token')}`,
    'content-type': 'application/json'
    }

const apiElement = new Api(url);
export default apiElement;