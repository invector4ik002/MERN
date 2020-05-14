import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
   const history = useHistory();// специальный хук для возвратов и в общем нужно еще почитать онем что то вроде редиректа
   const auth = useContext(AuthContext);
   const { request } = useHttp();
   const [link, setLink] = useState('');

   const pressHandler = async (event) => {
      if (event.key === 'Enter') {
         try {
            const data = await request('/api/link/generate', 'POST', {from: link},{
               Authorization: `Bearer ${auth.token}`// пропустил ключ Bearer и получал 500 от сервака 
            })                                      // нормально так посидел :)
            console.log(data)
            history.push(`/detail/${data.link._id}`)// что то вроде редиректа , перешли в компонент DetailPages(в браузере с таким путем http://localhost:3000/detail/5e93786aa8f53d43ec295302)
         } catch(err) {}
      }
   }

   return (
      <div className="row">
         <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
            <div className="input-field">
               <input 
                  placeholder="Вставте ссылку" 
                  id="link" 
                  type="text" 
                  className="validate"
                  value={link}
                  onChange={ (event) => setLink(event.target.value)}
                  onKeyPress={pressHandler} // нажатие на enter формирует ссылку короче клик по клавише
               />                        
               {/* <label htmlFor="link">Email</label> */}
            </div>
         </div>
      </div>
   )
};