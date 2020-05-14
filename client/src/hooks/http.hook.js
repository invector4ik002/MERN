import {useState, useCallback} from 'react';

export const useHttp = () => { // кастомный хук для работы с асинхронными запросами 
   const [loading, setLoading] = useState(false); // локальное состояние загрузки loading(false)
   const [error, setError] = useState(null); // локальное состояние error(null)

   const request = useCallback( async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {

         if (body) {// если пердался (body).  
            body = JSON.stringify(body) //приводим к строке, отвечает за корректное отправление данных на сервер
            headers['Content-Type'] = 'application/json' // отвечает за корректное отправление данных на сервер (специальная важная штука ) 
         }

         const response = await fetch(url, {method, body, headers})//fetch браузерный метод. первый параметр url второй набор опций
         const data = await response.json() // полученные данные переводим в json 
         console.log('БОЛЬШАЯ ДАТА', data)
         
         if(!response.ok) {
            throw new Error(data.message || 'Ошибка http.hook.js')
         }

         setLoading(false)

         return data

      } catch (err) {
         setLoading(false)
         setError(err.message)
         throw err
      }
   }, []);

   const clearError = () => setError(null)

   return { loading, request, error, clearError }
}