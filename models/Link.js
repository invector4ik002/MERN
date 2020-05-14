/**
 * Модель для сокращения ссылок "Link"
 * описание логики ссылки и что нужно для ее реализации
 * 
 */
const { Schema, model, Types } = require('mongoose');

const schema = new Schema ({
   from: {           // откуда ссылка 
      type: String,  // поле указывает то что это строка 
      required: true// поле обязательное
   },
   to: {             // куда ссылка
      type: String,  // поле указывает то что это строка
      required: true,// поле обязательное
      unique: true  // полк уникальности то есть эту сылку мы будем генерировать , как то так пока 
   },
   code: {           // не понял суть поля
      type: String,  // поле указывает то что это строка
      required: true,// поле обязательное
      unique: true  // полк уникальности то есть эту сылку мы будем генерировать , как то так пока 
   },
   date: {              // дата создания ссылки
      type: Date,       // поле указывает то что это Дата
      default: Date.now// поле по умолчанию с методом определения даты но без вызова (видимо в другом месте вызов)
   },
   clicks: {           // статистика кликов 
      type: Number,    // тип номер
      default: 0      // по умолчанию 0
   },
   owner: {                 // владелец ссылки
      type: Types.ObjectId, // тип по методу сгенерированного id на БД
      ref: 'User'          // ссылка на модель Пользователя
   }
});

module.exports = model('Link', schema); // экспорт модели с названием модели по типу схема