const jwt = require('jsonwebtoken'); // в переменную jwt подключаем библиотеку
const config = require('config'); // подключаем конфиг
/** 
 * мидлвары это обычные функции которые позволяют перехватывать данные
 * @param{req} запрос
 * @param{res} ответ
 * @param{next} продолжение запроса
 */
module.exports = (req, res, next) => {
   if (req.method === 'OPTIONS') { // 'OPTIONS' это спец.метод который присудствует в рестAPI который проверяет доступность сервера
      return next() // тоесть продолжаем делать запрос
   }

   try {
     // в переменную token получаем токеен из запроса в заголовке авторизован
      const token = req.headers.authorization.split(' ')[1] // строка с фронтенда "Bearer TOKEN" обработка сплитом по пробелу забираем [1] 
     // забираем первое тоесть строку именно кода токена
      if (!token) { // если не токен тогда 401 - нет авторизации 
         return res.satatus(401).json({ message: 'Нет авторизации' })
      }
 
      const decoded = jwt.verify(token, config.get('jwtSecret')) // jwt.verify расшифровка токена по заголовку из конфига, не забываем подключить
      req.user = decoded // сохранем в переменной раскодированный токен
      // console.log(decoded)
      next()// продолжаем выполнение запроса

   } catch(err) {
      res.satatus(401).json({ message: 'Нет авторизации' }) // если возникла ошибка то тогда это вот сообщение :)
   }
};