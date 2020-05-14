const { Schema, model, Types } = require('mongoose'); // для работы с моделью User

const schema = new Schema ({ // по конструктору Schema создаем обьект-шаблон который отправляет данные на mongoBD 
   email: { // настройки поля email
      type: String, // поле указывает то что это строка
      required: true, // поле ОБЯЗАТЕЛЬНОЕ
      unique: true, // поле индивидуальное 
   },
   password: { // настройки поля password
      type: String, // поле указывает то что это строка
      required: true, // поле ОБЯЗАТЕЛЬНОЕ
   },
   links: [{ // настройка поля links
      type: Types.ObjectId, // Будет иметь ID
      ref: 'Link', // привязоно к модели "Link"
   }]  
})

module.exports = model('User', schema) // экспортируем 

