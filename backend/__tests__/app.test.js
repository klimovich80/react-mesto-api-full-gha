const mongoose = require('mongoose');
const User = require('../models/user');
const fixtures = require('../fixtures/app');
const supertest = require('supertest');
const app = require('../app.js');
const request = supertest(app);

const MONGO_URL = 'mongodb://localhost:27017/mestodb';

beforeAll(() => {
    return mongoose.connect(MONGO_URL);
});

afterAll(() => {
    // Отменяем подключение к БД 
    mongoose.disconnect();
});

describe('Тестирование базы данных', () => {

    beforeEach(() => {
        const { name, about, avatar, email, password } = fixtures.user;

        return User.create({
            name,
            about,
            avatar,
            email,
            password,
        });
    });

    afterEach(() => User.deleteOne({ email: fixtures.user.email }));

    it('# Пользователь должен быть', () => {
        return User.findOne({ email: fixtures.user.email })
            .then((user) => {
                expect(user).toBeDefined();
                expect(user.email).toBe(fixtures.user.email);
                expect(user.name).toBe(fixtures.user.name);
            });
    });
});

//  тестируем запросы
describe('Защита авторизацией', () => {
    it('# В ответе приходит JSON объект', () => {
        return request.post('/users').then((response) => {
            expect(response.headers['content-type']).toContain('application/json');
        });
    });
    it('# Код ответа равен 401', () => {
        return request.post('/users').then((response) => {
            expect(response.statusCode).toBe(401);
        });
    });
    it('# Проверка возврата поля message', () => {
        return request.post('/users').then((response) => {
            expect(response.body.message).toBeTruthy();
        });
    });
});

//TODO make tests
 
// ❏ signup
//   [POST] Добавление пользователя с полем name меньше 2 символов
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Ashley_Russel@hotmail.com"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""2"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя с полем name больше 30 символов
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Lola_Boyer53@gmail.com"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""Fugit corrupti eos voluptas at aut quaera "
// t. Voluptate sint et natus nobis. Blanditiis placeat t 
// empora enim at doloribus aut beatae. Accusantium dolor 
//  saepe dolores et. Dolorem nisi omnis perspiciatis qui 
// " vitae."", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя с полем about меньше 2 символов
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Blaze_Bailey@hotmail.com"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""8"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя с полем about больше 30 символов
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Haley94@yahoo.com"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""Sequi et fugit vero odio aut voluptatem  "
// labore quia. Et voluptas aut dolorem nisi at dolores s 
// "aepe aut."", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя с некорректным url-адресом в поле avatar
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Cale.Hauck@yahoo.com"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""about"", "
// "    ""avatar"": ""link:/link~!bad"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя с некорректным email
//  POST   http://localhost:3000/signup 
// { 
// "    ""email"": ""test"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя без обязательного поля email
//  POST   http://localhost:3000/signup 
// { 
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"", "
// "    ""password"": ""longPass"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя без обязательного поля password
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""Kenyon_Hilll@hotmail.com"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление пользователя без необязательных полей
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""em2@em2.ru"", "
// "    ""password"": ""O65cgxsnGY6eAuD"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 или 201 
//    ✓     В ответе не содержится password созданного пользователя 
 
//   [POST] Добавление пользователя
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""em@em.ru"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 или 201 
//    ✓   Данные в ответе совпадают с переданными 
//    ✓     В ответе не содержится password созданного пользователя 
 
//   Добавление доп. пользователя для теста добавления пользователя с существующим email в БД
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""em3@em3.ru"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
 
//   [POST] Добавление пользователя с существующим email в БД
//  POST   http://localhost:3000/signup 
// { 
// "     ""email"": ""em3@em3.ru"", "
// "    ""password"": ""longPass"", "
// "    ""name"": ""test"", "
// "    ""about"": ""about"", "
// "     ""avatar"": ""https://ya.ru/av.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 409 
//    ✓     Проверка возврата поля message 
 
// ❏ signin
//   [POST] Авторизация с несуществующими email и password в БД
//  POST   http://localhost:3000/signin 
// { 
// "     ""email"": ""test@test.ru"", "
// "    ""password"": ""12345678"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 401 
//    ✓     Проверка возврата поля message 
 
//   [POST] Авторизация с некорректным полем email
//  POST   http://localhost:3000/signin 
// { 
// "    ""email"": ""test"", "
// "    ""password"": ""longPass"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Авторизация без обязательного поля email
//  POST   http://localhost:3000/signin 
// { 
// "    ""password"": ""longPass"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Авторизация без обязательного поля password
//  POST   http://localhost:3000/signin 
// { 
// "     ""email"": ""em@em.ru"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Авторизация
//  POST   http://localhost:3000/signin 
// { 
// "     ""email"": ""em@em.ru"", "
// "    ""password"": ""longPass"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓    mCервер вернул в теле ответа JWT-токен: 
 
// ❏ users
//   [GET] Получение информации о пользователе
//   GET   http://localhost:3000/users/me 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓     Проверка возврата корректных данных 
//    ✓     В ответе отсутствует поле password 
 
//   [GET] Добавленному пользователю без необязательных полей, присвоены стандартные значения
//   GET   http://localhost:3000/users 
//    ✓     В ответе приходит JSON-объект 
//    ✓    Полям name, about и avatar присвоены стандартные значения 
 
//   [GET] Получение списка пользователей
//   GET   http://localhost:3000/users 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓     Проверка списка пользователей 
//    ✓     В ответе отсутствует поле password 
 
//   [GET] Получение пользователя по id
//   GET   http://localhost:3000/users/6485b1ded850a71a173c9cfe 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓   Данные в ответе совпадают с данными добавленного пользователя 
//    ✓     В ответе отсутствует поле password 
 
//   [GET] Получение пользователя с некорректным id
//   GET   http://localhost:3000/users/text 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [GET] Получение пользователя с несуществующим в БД userid
//   GET   http://localhost:3000/users/61eade4c6d5acf558c42d9b8 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 404 
//    ✓     Проверка возврата поля message 
 
//   [PATCH] Обновление данных пользователя
// PATCH   http://localhost:3000/users/me 
// {    
// "    ""name"": ""Обновленное имя"", "
// "    ""about"": ""Обновленная информация о себе"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓   Данные в ответе совпадают с данными обновленного пользователя 
//    ✓     В ответе отсутствует поле password 
 
//   [PATCH] Обновление данных пользователя с полем name меньше 2 символов
// PATCH   http://localhost:3000/users/me 
// {    
// "    ""name"": ""s"", "
// "    ""about"": ""Обновленная информация о себе"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [PATCH] Обновление данных пользователя с полем name больше 30 символов
// PATCH   http://localhost:3000/users/me 
// {    
// "    ""name"": ""Delectus eveniet optio quia temporibus om "
// nis minus. Laborum quia quia exercitationem qui porro  
// itaque. Autem debitis facilis est dicta. Et molestias  
// "voluptatum."", "
// "    ""about"": ""Обновленная информация о себе"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [PATCH] Обновление данных пользователя с полем about меньше 2 символов
// PATCH   http://localhost:3000/users/me 
// {    
// "    ""about"": ""d"", "
// "    ""name"": ""Обновленное имя"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [PATCH] Обновление данных пользователя с полем about больше 30 символов
// PATCH   http://localhost:3000/users/me 
// {    
// "    ""about"": ""Nobis et fugit consequuntur consequatur. "
//  Est dolore aliquid quaerat quas cupiditate possimus d 
// eleniti esse. Asperiores sunt aspernatur omnis cumque  
// "omnis."", "
// "    ""name"": ""Обновленное имя"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [PATCH] Обновление аватара пользователя
// PATCH   http://localhost:3000/users/me/avatar 
// {    
// "     ""avatar"": ""https://ya.ru/av2.bmp"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓    mUrl-адрес аватара в ответе совпадает с url-адресом аватара в запросе 
//    ✓     В ответе не содержится password пользователя 
 
//   [PATCH] Обновление аватара пользователя с некорректным url-адресом
// PATCH   http://localhost:3000/users/me/avatar 
// {    
// "    ""avatar"": ""link:/link~!bad"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
// ❏ cards
//   [POST] Добавление карточки
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""testCard"", "
// "     ""link"": ""https://ya.ru/link.test"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 или 201 
//    ✓     В ответе содержится id созданной карточки 
 
//   [POST] Добавление карточки с полем name меньше 2 символов
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""u"", "
// "     ""link"": ""https://ya.ru/link.test"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление карточки с полем name больше 30 символов
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""Quia praesentium sunt vel et qui. Volupta "
// tibus pariatur veniam est quia quam minus ea quia. Pos 
// "simus corrupti quia repellat ab."", "
// "     ""link"": ""https://ya.ru/link.test"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление карточки с некорректным url-адресом в поле link
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""testCard"", "
// "    ""link"": ""link:/link~!bad"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление карточки без обязательного поля name
//  POST   http://localhost:3000/cards 
// { 
// "     ""link"": ""https://ya.ru/link.test"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [POST] Добавление карточки без обязательного поля link
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""testCard"" "
// } 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [GET] Получение списка карточек
//   GET   http://localhost:3000/cards 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
//    ✓     Проверка списка карточек 
 
//   [PUT] Добавление лайка карточке
// PUT   http://localhost:3000/cards/6485b1dfd850a71a173c9d0d/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 или 201 
 
//   [PUT] Добавление лайка с некорректным id карточки
// PUT   http://localhost:3000/cards/text/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [PUT] Добавление лайка с несуществующим в БД id карточки
// PUT   http://localhost:3000/cards/61eade4c6d5acf558c42d9b8/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 404 
//    ✓     Проверка возврата поля message 
 
//   [DELETE] Удаление лайка у карточки с некорректным id
//  DELETE  http://localhost:3000/cards/text/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [DELETE] Удаление лайка у карточки с несуществующим в БД id
//  DELETE  http://localhost:3000/cards/61eade4c6d5acf558c42d9b8/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 404 
//    ✓     Проверка возврата поля message 
 
//   [DELETE] Удаление лайка у карточки
//  DELETE  http://localhost:3000/cards/6485b1dfd850a71a173c9d0d/likes 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
 
//   [GET] Проверка отсутствия лайка у карточки после его удаления
//   GET   http://localhost:3000/cards 
//    ✓     В ответе приходит JSON-объект 
//    ✓   Удаленныйлайк не должен присутствовать в карточке 
 
//   [DELETE] Удаление карточки
//  DELETE  http://localhost:3000/cards/6485b1dfd850a71a173c9d0d 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 200 
 
//   [GET] Проверка отсутствия удаленной карточки в БД
//   GET   http://localhost:3000/cards 
//    ✓     В ответе приходит JSON-объект 
//    ✓    mУдаленной карточки не должно быть в БД 
 
//   [DELETE] Удаление карточки с некорректным id
//  DELETE  http://localhost:3000/cards/text 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 400 
//    ✓     Ошибка валидации поймана при помощи Joi 
 
//   [DELETE] Удаление карточки с несуществующим в БД id
//  DELETE  http://localhost:3000/cards/61eade4c6d5acf558c42d9b8 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 404 
//    ✓     Проверка возврата поля message 
 
//   Добавление карточки
//  POST   http://localhost:3000/cards 
// { 
// "    ""name"": ""testCard"", "
// "     ""link"": ""https://ya.ru/link.test"" "
// } 
//    ✓     В ответе приходит JSON-объект 
 
//   Авторизация другим пользователем
//  POST   http://localhost:3000/signin 
// { 
// "     ""email"": ""em3@em3.ru"", "
// "    ""password"": ""longPass"" "
// } 
//    ✓     В ответе приходит JSON-объект 
 
//   [DELETE] Удаление карточки другого пользователя
//  DELETE  http://localhost:3000/cards/6485b1e0d850a71a173c9d19 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 403 
 
//   [PATCH] Обработка неправильного пути
// PATCH   http://localhost:3000/404 
//    ✓     В ответе приходит JSON-объект 
//    ✓     Код ответа равен 404 
//    ✓     Проверка возврата поля message 