import React, {useState, useContext, useCallback, useEffect} from 'react';

import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
   const [links, setLinks] = useState([]);
   const {loading, request} = useHttp();
   const {token} = useContext(AuthContext);
   // console.log('тут ссылки ?', links)
   const fetchLinks = useCallback( async () => {
      try {
         const fetched = await request('/api/link', 'GET', null, {
            Authorization: `Bearer ${token}`
         })
         
         console.log(fetched)
         setLinks(fetched)
      } catch(err){

      }

   }, [token, request])
   
   useEffect(() => {
      fetchLinks()
   }, [fetchLinks])
   
   if (loading) {
      return (
         <Loader />
      )
   }
   
   return (
      <>
         {!loading && <LinksList links={links}/>}
      </>
   )
};