import React from 'react';
/**
 * импорируем { Switch } <Switch></Switch> из 'react-router-dom';
 * импортируем { Switch, Route } <Route></Route>
 * импортируем { Switch, Route, Redirect } <Redirect></Redirect>
 */
import { Switch, Route, Redirect } from 'react-router-dom';

import { LinksPage } from './pages/LinksPage';
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPages } from './pages/DetailPages';
/**
 * Определитель авторизован или нет user
 * @param {*} isAuthenticated флаг по которому возвращается определенный набор роутов
 * if(isAuthenticated) если авторизован(true) тогда 
 * return (<Switch></Switch>) возвращаем кол-во роутов 
 * если нет (folse) тогда возвращается другой набор <Switch></Switch>
 */
export const useRoutes = (isAuthenticated) => {
   if(isAuthenticated) {
      return (
         <Switch>
            <Route path="/links" exact>
               <LinksPage />
            </Route>
            <Route path="/create" exact>
               <CreatePage />
            </Route>
            <Route path="/detail/:id">
               <DetailPages />
            </Route>
            <Redirect to="/create" />
         </Switch>
      ) 
   }
   return (
      <Switch>
         <Route path="/" exact>
            <AuthPage />
         </Route> 
         <Redirect to="/" />
      </Switch>
   )
}