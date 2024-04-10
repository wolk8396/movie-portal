import React from 'react';

import './main.scss'
import Paginator from '../../shared/UI/Paginator/Paginator';

const Main: React.FC = () => {

 const onPageChange = (page: number) => {
  console.log(page);
  
 }
  return (
    <>
      <div>main</div>
      <Paginator 
        totalPages={23} 
        onPageChange={(page) => onPageChange(page)}
      />
    </>
  )
}

export default Main;