import React from 'react';
import { MapDateFilms } from '../../../core/models/movie.models';

import './button.scss';

interface ButtonProps {
  title: string,
  className: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({title, className, onClick}) => {
  return (
    <>
      <button 
        className={`btn ${className}`} 
        onClick={onClick}
      >{title}
      </button>
    </>
  )
}

export default Button;