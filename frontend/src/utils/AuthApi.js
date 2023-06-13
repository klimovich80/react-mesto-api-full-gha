export const BASE_URL = "https://auth.nomoreparties.co";

const sendRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${url}`, options).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} -> ${res.statusText}!`);
  });
};

export const register = (password, email) => {
  return sendRequest("/signup", "POST", { password, email });
};

export const login = (password, email) => {
  return sendRequest("/signin", "POST", { password, email });
};

export const getUserInfo = (token) => {
  return sendRequest("/users/me", "GET", null, token);
};
