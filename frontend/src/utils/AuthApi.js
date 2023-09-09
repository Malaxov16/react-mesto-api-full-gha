class authApi {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //метод проверки ответа от сервера
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(res.status)
    }

    //метод вызывает fetch с параметрами
    _request(baseUrl, options) {
        return fetch(`${baseUrl}`, options).then(this._checkResponse)
    }

    //функция регистрации пользователя
    register(email, password) {
        this._email = email;
        this._password = password;
        return this._request(
            `${this._baseUrl}/signup`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    email: this._email,
                    password: this._password
                })
            }
        )
        
    }

    login(email, password) {
        this._email = email;
        this._password = password;
        return this._request(
            `${this._baseUrl}/signin`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    email: this._email,
                    password: this._password,
                })
            }
        )
    }

    getContent(token) {
        this._token = token;
        return this._request(
            `${this._baseUrl}/users/me`,
            {
                method: 'GET',
                headers: {
                    "content-Type": "application/json",
                    "Authorization" : `Bearer ${this._token}`
                }
            }
            
        )
    }
}

const BASE_URL = 'http://api.project-mesto.nomoredomainsicu.ru';
const headers = {
    "Content-Type": "application/json" 
}
const authApiElement = new authApi(BASE_URL, headers);
export default authApiElement;