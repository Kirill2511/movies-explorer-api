module.exports = {

  SUCCESS: {
    REMOVE_MOVIE: 'Фильм успешно удален',
    AUTHORIZATION: 'Авторизация прошла успешно',
  },

  CLIENT_ERROR: {
    AUTHENTICATION: 'Неправильные почта или пароль',
    AUTHORIZATION: 'Требуется авторизация',
    FORBIDDEN: 'Недостаточно прав для выполнения операции',
    MOVIE_NOT_FOUND: 'Фильм не найден',
    MOVIE_NOT_FILLED: 'Не все поля заполнены',
    USER_NOT_FOUND: 'Пользователь не найден',
    RESOURCE_NOT_FOUND: 'Запрашиваемый ресурс не найден',
    CONFLICT: 'Пользователь с таким email уже зарегистрирован',
    TOO_MANY_REQUESTS: 'Запросы, поступившие с вашего IP-адреса, похожи на автоматические. Попробуйте повторить попытку позже',
  },

  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: 'На сервере произошла ошибка: ',
  },

};
