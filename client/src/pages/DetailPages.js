import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // хук из дома получает ключ(id) из роутов  <Route path="/detail/:id">

import { useHttp } from '../hooks/http.hook'; // импортируем хуки что бы с ними работать 
import  { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPages = () => {
   const { token } = useContext(AuthContext);
   const { request, loading } = useHttp(); // получаем из каст.хука функцию reqest(в которой получаем data с БД и соответственно поля) 
   const [link, setLink] = useState(null); // link получаем с БЭКА
   const linkId = useParams().id; // в переменной (id который взяли от ссылки роутинга)

   const getLink = useCallback( async () => { // функция для получения ссылки по id 
      try {
          const fetched = await request(`/api/link/${linkId}`, 'GET', null, { // в эту функцию задаем аргументы которых ждет каст.хук
            Authorization: `Bearer ${token}`
         })
         setLink(fetched)
         // console.log(fetched)
      } catch(err) {}

   }, [token, linkId, request])
   
   useEffect(() => { // работает когда срабатывает функция getLink()
      getLink()
   }, [getLink])
   
   if (loading) {
      return <Loader />
   }
   console.log(link)
   return (
      <>
         { !loading && link && <LinkCard link={link} /> }
      </>
   )
};