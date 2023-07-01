import BASE_URL from './config';
class Api {
  constructor(config) {
    console.log('calling api')
    this._baseUrl = `${config.baseUrl}`;
    this._headers = config.headers;
    console.log(this._headers);
  }

  _request(url, token, method, body) {
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    };

    if (method) {
      options.method = method;
    }
    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Cards methods
  getInitialCards(token) {
    return this._request(`/cards`, token);
  }

  postNewCard(name, link, token) {
    return this._request(`/cards`, token, "POST", { name, link });
  }

  deleteLike(id, token) {
    return this._request(`/cards/${id}/likes`, token, "DELETE");
  }

  addLike(id, token) {
    return this._request(`/cards/${id}/likes`, token, "PUT");
  }

  setLikeStatus(id, isLiked, token) {
    return isLiked ? this.deleteLike(id, token) : this.addLike(id, token);
  }

  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, token, "DELETE");
  }

  //profile methods
  getProfileInfo(token) {
    return this._request(`/users/me`, token);
  }

  editProfileInfo(name, about, token) {
    return this._request(`/users/me`, token, "PATCH", { name, about });
  }

  editProfileAvatar(url, token) {
    return this._request(`/users/me/avatar`, token, "PATCH", {
      avatar: url,
    });
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
});
