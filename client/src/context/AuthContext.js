import { createContext } from 'react'; // создаем конекст при помощи спец.функции createContext

function noop() {} // не понял я зачем это :)

export const AuthContext = createContext({ // создаем контекст тоесть обьект изночальных значений полей для импорта во все приложение
   token: null, // токен нашего пользователя иночально (null)
   userId: null, // id нашего пользователя изначально (null)
   login: noop, // залогинен ДОШЛО ЗАЧЕМ(не понял я зачем это) из кастомного хука прилетает рабочая функция и заменяет эту! 
   logout: noop, // разлогинен ДОШЛО ЗАЧЕМ(не понял я зачем это) из кастомного хука прилетает рабочая функция и заменяет эту!
   isAuthenticated: false // Аутентифицировано (false) то есть изночально не залогинен
});