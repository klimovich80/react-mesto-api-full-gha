class Api {
  constructor(config) {
    this._groupId = config.groupId;
    this._baseUrl = `${config.baseUrl}`;
    this._headers = config.headers;
  }

  _request(url, method, body) {
    const options = {
      headers: this._headers,
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
  getInitialCards() {
    return this._request(`/cards`);
  }

  postNewCard(name, link) {
    return this._request(`/cards`, "POST", { name, link });
  }

  deleteLike(id) {
    return this._request(`/cards/${id}/likes`, "DELETE");
  }

  addLike(id) {
    return this._request(`/cards/${id}/likes`, "PUT");
  }

  changeLikeCardStatus(id, isLiked) {
    return isLiked ? this.addLike(id) : this.deleteLike(id);
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, "DELETE");
  }

  //profile methods
  getProfileInfo() {
    return this._request(`/users/me`);
  }

  editProfileInfo(name, about) {
    return this._request(`/users/me`, "PATCH", { name, about });
  }

  editProfileAvatar(url) {
    return this._request(`/users/me/avatar`, "PATCH", {
      avatar: url,
    });
  }
}

export const api = new Api({
  groupId: "cohort-61",
  baseUrl: "http://localhost:3000",
  headers: {
    authorization: "ec0a3331-3b70-4ae3-9ae6-450b13b2e789",
    "Content-Type": "application/json",
  },
});
