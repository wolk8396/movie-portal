import React from 'react';

import './button.scss';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface ButtonProps {
  title: string;
  children?: React.ReactNode;
  className: string;
  onClick?: () => void;
  style: DynamicKeyModels;
  isLoading?: boolean
  type?: "button" | "reset" | "submit"
}

const Button: React.FC<ButtonProps> = ({title, className, onClick, style, type, isLoading, children}) => {
  return (
    <>
      <button 
        disabled={isLoading}
        type={type}
        className={`btn ${className}`} 
        onClick={onClick}
        style={style}
      >

      {isLoading ? children : title}
      </button>
    </>
  )
}

export default React.memo(Button); 
