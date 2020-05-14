import React, { useState, useContext} from 'react';

import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {
   const auth = useContext(AuthContext); // таким образом получаем в переменную auth весть контекст(объект) через <AuthContext.Provider value={{}}
   const { loading, request, error} = useHttp(); // получаем из него обьект и достаем из него поля loading, request, error
   const [form, setForm] = useState({
      email: '',
      password: ''
   });
   console.log(form)
   // useEffect(() => {
      
   // }, [error])

   const changeHandler = (event) => { // диструктиризирует фходящее состояния form и подставляет в него инф.с input
      setForm({ ...form, [event.target.name]: event.target.value})// [event.target.name] динамический ключ по имени принемает значение с input
   };

   const registerHandler = async () => {  
      try {
         const data = await request('/api/auth/register', 'POST', { ...form });
         console.log('AuthPage.js: Data >',data)
         // message(data.message)
      } catch (err) {}
   };

   const loginHandler = async () => { // функция для логирования в браузере через токен привязаня к кнопке "войти"
      try {
         const data = await request('/api/auth/login', 'POST', { ...form });
         auth.login(data.token, data.userId); // из объекта(auth) через ситаксис .login получаем данные из функции login
      } catch (err) {

      }
   };

   return (
      <div className="row">
         <div className="col s6 offset-s3">
            {error && <h4>Ошибка: пароль или email</h4>} {/* можно сделать крутой компонент со всяким разным */}
            {/* <h1>Сократи ссылку</h1> */}
            <div className="card grey darken-4">
               <div className="card-content yellow-text">
                  <span className="card-title">Авторизация</span>
                  <div>
                     <div className="input-field">
                        <input 
                           placeholder="Введите email" 
                           id="email" 
                           type="text" 
                           className="validate"
                           name="email"
                           value={form.email}
                           onChange={changeHandler}
                        />                        
                        {/* <label htmlFor="email">Email</label> */}
                     </div>
                     <div className="input-field">
                        <input 
                           placeholder="Введите пароль" 
                           id="password" 
                           type="password" 
                           className="validate"
                           name="password"
                           value={form.password}
                           onChange={changeHandler}
                        />
                        {/* <label htmlFor="password">Пароль</label> */}
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  <button 
                     className="btn yellow darken-4" 
                     style={{marginRight: 10}}
                     onClick={loginHandler}
                     disabled={loading}
                     >
                     Войти
                     </button>
                  <button 
                     className="btn grey lighten-1 black-text"
                     onClick={registerHandler}
                     disabled={loading}
                     >
                     Регистрация
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
};