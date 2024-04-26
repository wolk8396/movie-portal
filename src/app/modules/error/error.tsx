import React from 'react';

import './error.scss'
import { cat } from '../../shared/consts/image';

const NotFound: React.FC = () => {
  return (
    <div className="failure">
      <div className="container-failure">
        <div className="wrapper-title">
          <span className="title-failure">Oh no!</span>
        </div>
        <div className="container-cat-failure">
          <img className="cat-failure" src={cat} alt="" />
        </div>
      </div>
    </div>
  )
}
export default NotFound;
