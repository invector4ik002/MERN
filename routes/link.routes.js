const { Router } = require('express'); // из библиотеки подключаем Router
const shortid = require('shortid'); // библиотека сокращения ссылок

const config = require('config');// подключаем конфиг нам нужно поле из него "baseUrl": "http://localhost:4000"
const auth = require('../middleware/auth.middleware'); // подключаем мидлвар-расшифровщик :)
const Link = require('../models/Link'); // принемаем модель (объкт с полями настроек наших ссылок)

const router = Router() // создаем (обьект) при помощи функции Router

router.post('/generate', auth, async (req, res) => { // по этой ссылке будет происходить генерация ссылок "сокращенная"
   try {
      const baseUrl = config.get('baseUrl')// тут это "http://localhost:4000"
      const { from } = req.body // с фронта получаем ссылку. для редиректа по данному пути

      const code = shortid.generate() // в переменной уникальный код 
      const existing = await Link.findOne({ from }) // находим ссылку исходящая (from) и помещаем в переменную (existing-существующий)
      
      if (existing) {
         return res.json({ link: existing }) // если есть существующий тогда отправляем статус по умолчанию 200 return остановит код
      }

      const to = baseUrl + '/t/' + code // данная переменная содержит базовый урл из конфига добавили конкатенацией '/t/' и сокращенный путь(наверное)

      const link = new Link ({ // создаем новый обьект ссылки пройдя 
         code, // закодированное-сокращенное
         to, // конкатенированное 
         from, // кусок из боди из фронта ссылка куда то
         owner: req.user.userId // и все это принадлежит из расшифрованного token user по id. 
      })
      // console.log(link)
      await link.save() // сохранеяем ссылку на БД

      res.status(201).json({ link })// отображаем в консоли нетворк ссылку которую сохранили и вернули с БД 

   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});
/**
 * @param{auth} - в переменной auth заложана логика расшифровки токена в котором есть нужное поле userId 
 * теперь не авторизованные пользователи не могут создавать ссылки 
 */
router.get('/', auth, async (req, res) => { // гет запрос для получения всех ссылок и возвращают их
   try { // получение данных пользователя с фронтенда получится по jwtToken потому что в нем закодирован userId это также пригодятся для 
   // привязывания новой ссылки к пользователю
     const links = await Link.find({ owner: req.user.userId }) // в переменной (обьект-модель) в которой находим ссылки владельца
     
     res.json(links) // получаем на фронт обьект по модели
   //   console.log(links)// ?
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});

router.get('/:id', auth, async (req, res) => { // гет запрос для получения ссылок по id и возвращают их
   try {
     const link = await Link.findById(req.params.id) // в переменной (обьек-ссылка по id) в которой находим врадельца по .findById
     res.json(link) // получаем на фронт (обьект-ссылку) из модели
   } catch (err) {
   res.status(500).json({ message: '...Error server !!!' })
   }
});

module.exports = router // экспортируем данный модуль