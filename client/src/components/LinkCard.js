import React from 'react';

export const LinkCard = ({ link }) => {
   // console.log(link)
   return (
      <>
         <h1>LinkCard</h1>
         <p>Ваша ссылка: 
            <a 
               href={link.to} // св-во из пропса (link)
               target="_blank" // при клике открывается в новом окнеб, спец атрибут
               rel="noopener noreferrer"> 
               {link.to} 
            </a>
         </p>
         <p>Откуда: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
         <p>Кол-во: <a href={link.clicks}>{link.clicks}</a></p>
         <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
      </>
   )
};