import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import { AuthContext } from './context/AuthContext'; // получаем изночальное состояние 
import { useAuth } from './hooks/auth.hook'; // хук Авторизация и Выходов
import { useRoutes } from './routes'; // компонент маршрутов
import { Navbar } from './components/Navbar'; // компонент верхнего меню 
import { Loader } from './components/Loader'; // компонент верхнего меню 

function App() {
   const { login, logout, token, userId, ready } = useAuth();
   const isAuthenticated = !!token; // переменная в которой token как булево значение за счет синтаксиса !! 
   const routes = useRoutes(isAuthenticated); // (false) являлось заглушкой теперь тут динасмичесткое значение isAuthenticated
   
   if(!ready) {
      return <Loader/>
   }

   return (
      <AuthContext.Provider value={{// .Provider назначаем поставщиком для всего приложения так как у него стейт пустой ему назначаем из хука useAuth
         token, // из хука useAuth динамические значения вытикающие из сервера
         userId, // из хука useAuth динамические значения вытикающие из сервера
         login, // из хука useAuth динамические значения вытикающие из сервера
         logout, // из хука useAuth динамические значения вытикающие из сервера
         isAuthenticated, // из хука useAuth динамические значения зависит от залогинен пользователь или нет (!!token)
      }}> 
         <Router>
            {isAuthenticated && <Navbar />} {/* если залогинен то тогда компонент <Navbar /> отрисуется */}
            <div className="container">
              {routes} {/*перременная содержащая в себе компонент всех маршрутов*/}  
            </div>
         </Router>
      </AuthContext.Provider>
   )
}

export default App;
