// Пишем/Регистрируем роуты/маршруты для запросов API с ФРОНТА Этот роутер отвечает за подключение РЕГИСТРАЦИИ
// Данный роутер обрабатывает 2 "post" запроса первый регистрация, второй на вход с проверкой залогинен или нет

const { Router } = require('express'); // подключаем спец.функцию "Router" для создания роутеров
const bcrypt = require('bcryptjs'); // библиотеке шифрования и сравнение (уже зашифрованного)
const config = require('config'); // подключение конфига
const jwt = require('jsonwebtoken'); // библиотека для работы с токеном
const { check, validationResult } = require('express-validator'); // библиотека для работы с валидированием данных с формы

const User = require('../models/User'); // модель-обьект юзера
const router = Router(); // создаем роутер по правилам Router

// /api/auth/register  /api/auth прописано в app.js
router.post('/register', // регистрация "POST" 
   [ // массив мидлверов для валидации 
      check('email', 'Некорректный email').isEmail(), // метод "check" что проверяем "email", вывод сообщения при не соответствии. .isEmail() метод отвечающий за стандарты 
      check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 }) // проверяем "password", .isLength({ min: 6 }) длинна не меньше 6 симв
   ],
   async (req, res) => { // асинхронная запрос(req) ответ(res) 
      try {
      // console.log(req.body)
      const errors = validationResult(req); //  validationResult(req) результат на наличие ошибок при реквесте (собрали с боди)

      if(!errors.isEmpty()) { // !errors.isEmpty() метод говорит если метод  isEmpty() не пустой тогда ОШИБКИ
         return res.status(400).json({  // выводим на ФРОНТ(res)
            errors: errors.array(),
            message: 'Некорректные данные при регистрации'
         })
      }

     const { email, password } = req.body; // поля из боди это с браузера req - запрос и формы для отправки с ФРОНТА

     const condidate = await User.findOne({ email }); // проверка на уже существующего пользователя 

      if(condidate) { // после поиска в BD если наш из боди email совпадает с email в BD тогда return ошибка 
         return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12); // шифруем пароль на 12 раундов
      const user = new User({ email, password: hashedPassword }); // создаем поль.по классу-модели User созраняем email и зашиф.пароль(password: hashedPassword)
      await user.save(); // метод сохранения после все ложится в BD
      res.status(201).json({ message: 'Пользовыатель создан' });

   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' });
   }
});

// /api/auth/login  /api/auth прописано в app.js
// После корректной регистрации входим в систему по данным в BD 
router.post( // отправка на BD 
   '/login', 
   [
      check('email', 'Введите корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите пароль').exists() // .exists() пароль должен существовать
   ],
   async (req, res) => {
      
   try {
       const errors = validationResult(req); // validationResult(req) результат на наличие ошибок при реквесте (собрали с боди)
         if(!errors.isEmpty()) { // !errors.isEmpty() метод говорит если метод  isEmpty() не пустой тогда ОШИБКИ
            return res.status(400).json({ 
            errors: errors.array(),
            message: 'Некорректные данные при входе в систему'
         })
      }
      
      const {email, password} = req.body;// поля из боди это с браузера req - запрос и формы для отправки с ФРОНТА

      const user = await User.findOne({ email });// проверка на уже существующего пользователя
     
      if(!user) { // если нет пользователя (значит не зарегался)
        return res.status(400).json({ message: 'Пользователь не найден'}) 
      }
   
      const isMatch = await bcrypt.compare(password, user.password); // метод bcrypt.compare сравнивает поле "password" user.password пароль пользователя

      if(!isMatch) { // если не совпадает тогда неверый пароль
         return res.status(400).json({ message: 'Неверный пароль' }) // лучше не указвать какая именно ошибка при входе (защитка)
      }
      
      const token = jwt.sign(// спц.метод принемающий три параметра-объекта моджно больше указать
         { userId: user.id }, // обьект поле userId: которого зайдет в поле токена из переменной  user.id
         config.get('jwtSecret'), // секретный ключ из нашего конфига 'jwtSecret'-это поле из него
         { expiresIn: '1h' } // время жизни токена
      );
      
      res.json({ token, userId: user.id }); // ответ на ФРОНТ по умолчанию статус 200 не пишем . получаем ТОКЕН и id усера (с бека сгенерированный BD)
      
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});

module.exports = router;