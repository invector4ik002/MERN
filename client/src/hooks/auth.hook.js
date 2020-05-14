import { useState, useCallback, useEffect } from 'react';

const storageName = 'userData'; // имя хранилища

export const useAuth = () => { // кастомный хук для работы с подключением и отключеним системы
   const [token, setToken] = useState(null); // локальные состояния
   const [userId, setUserId] = useState(null); // локальные состояния
   const [ready, setReady] = useState(false); // локальные состояния 

   const login = useCallback( (jwtToken, id) => { // фуекция для логирования в браузере 
      setToken(jwtToken); // изменили состояние(null) token на токен
      setUserId(id); // изменили состояние(null) id на id

      localStorage.setItem(storageName, JSON.stringify({ // базовый браузерный api(вроде метода) сохранили в локальное хранилище
         userId: id, // получили с сервера
         token: jwtToken // получили с сервера
      })); 

   }, []);

   const logout = useCallback( () => { // функция для разлогирования
      setToken(null); // обнуление состояния token
      setUserId(null); // обнуление состояния userId
      localStorage.removeItem(storageName); // обнуление в локальном хранилище
   }, []);
   
   useEffect( () => {
      const data = JSON.parse(localStorage.getItem(storageName)); // преобразуем в обьект то что получили из getItem по ключу storageName

      if (data && data.token) { // если data не null и в data есть поле token
         login(data.token, data.userId); // при проверке в true запусаем функцию с параметрами из локального хранилища тем самым 
      }                                  // при логине useEffect срабатывает и постоянно видит login до время жизни token(1h)
      setReady(true)

   }, [login]); // зависимость для запуска useEffect

   return { login, logout, token, userId, ready };// кастомный хук возврощается с функционалом login, logout и полями с текущим состоянием token, userId
};