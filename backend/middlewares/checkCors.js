/* eslint-disable consistent-return */
// мидлваре для работы CORS не зайдествован

const allowedCors = [
  'http://project-mesto.nomoredomainsicu.ru',
  'https://project-mesto.nomoredomainsicu.ru',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  '127.0.0.1:3000',
];

module.exports = (req, res, next) => {
  console.log(req);
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
};
