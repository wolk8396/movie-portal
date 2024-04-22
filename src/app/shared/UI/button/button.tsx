import React from 'react';
import { MapDateFilms } from '../../../core/models/movie.models';

import './button.scss';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface ButtonProps {
  title: string;
  className: string;
  onClick?: () => void;
  style: DynamicKeyModels;
  type?: "button" | "reset" | "submit"
}

const Button: React.FC<ButtonProps> = ({title, className, onClick, style, type}) => {
  return (
    <>
      <button 
        type={type}
        className={`btn ${className}`} 
        onClick={onClick}
        style={style}
      >{title}
      </button>
    </>
  )
}

export default Button;
