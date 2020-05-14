import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom'; // 
import { AuthContext } from '../context/AuthContext'; // Контекстный объект

export const Navbar = () => {
   const history = useHistory(); // создаем обьект при помощи функции useHistory
   const auth = useContext(AuthContext); // получаем контекст (обьект содержащий поля с функциями и состояниями)

   const logoutHandler = (event) => { // функция для выхода из системы
      event.preventDefault(); // отключение обработки ссылки как как (<a href="/" )
      auth.logout(); // запуск выхода из системы (обнуление токена)
      history.push('/'); // выход на главную 
   };

   return (
      <nav>
         <div className="nav-wrapper  blue-grey darken-4" style={{ padding: '0 2rem' }}>
           <span className="brand-logo">Сокращение ссылок</span>
           <ul id="nav-mobile" className="right hide-on-med-and-down">
             <li><NavLink to='/create'>Создать</NavLink></li>
             <li><NavLink to='/links'>Ссылки</NavLink></li>
             <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
           </ul>
         </div>
      </nav>
   )
};