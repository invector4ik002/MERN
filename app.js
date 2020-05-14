const express = require('express'); // подключение "express"
const config = require('config'); // библиотека для работы с конфигуратором
const mongoose = require('mongoose'); // фреймворк-библиотека "mongoose" для создания сервера 

const app = express(); // app сервер по правилу express

app.use(express.json({ extended: true })); // мидлвар для понимания сервером json-ов (extended: true) тасширеное труе

app.use('/api/auth', require('./routes/auth.routes')); // подключаем мидлвр обработка API запросов с ФРОНТА с маршрутизатором auth.routes(логикой регистрации и логина)
app.use('/api/link', require('./routes/link.routes')); // подключаем мидлвр обработка API запросов с ФРОНТА с маршрутизатором link.routes(логикой отправок и запросов)
app.use('/t', require('./routes/redirect.routes'));

const PORT = config.get('port') || 4000; // создание порта 
/**
 * Функция подключения 
 * "mongoUri": "mongodb+srv://MikDev:123MikDev@cluster0-egprj.mongodb.net/app",
 */
async function start() { // функция обертка асинхронная 
   try {
      await mongoose.connect(config.get('mongoUri'),{ // подключение к базе данных "атлас mongoDB"
         useNewUrlParser: true, // спц.настройки
         useUnifiedTopology: true, // спц.настройки
         useCreateIndex: true, // спц.настройки
         // useFindAndModify: false
      })
      app.listen(PORT, () => { // работа на порту (4000)
         console.log(`Work: ...serwer ${PORT}`)
      })
   } catch (err) {
      // console.log('Server Error', err.message)
      process.exit(1)
   }
}
start();
