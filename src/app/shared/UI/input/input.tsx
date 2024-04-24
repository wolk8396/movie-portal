import React, { useEffect, useState } from 'react';

import './input.scss';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';
import classNames from 'classnames';

interface InputProps {
  label?: string;
  placeholder?: string;
  styleConf?:DynamicKeyModels;
  styles?:DynamicKeyModels;
  children?: React.ReactNode;
  notValid?:boolean;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input: React.FC<InputProps> = (props) => {
  const {children,  placeholder, onChange, onFocus, onBlur, styleConf, styles, notValid} = props;
  const [error, setError] = useState(notValid);
  const wrapperInput = classNames('container-input__container', {isNotValid: error});

  useEffect(() => {
    setError(notValid);
  }, [notValid]);
  
  return (
    <div className='container-input' style={styles}>
      <div className={wrapperInput} style={styles}>
        <div className='mask' style={styleConf}>
          <input
            placeholder={placeholder}
            className="form-input" 
            onChange={(e) => onChange(e)}
            onFocus={onFocus}
            onBlur={onBlur}
          /> 
        </div>
      </div>
      <div className='validMessage'>
        {children}
    </div>
    </div>
  )
}

export default Input;
