import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import './input-password.scss'
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';
import { eye, eye_invisible } from '../../consts/image';
import classNames from 'classnames';

interface InputPassWord {
  styleMask?: DynamicKeyModels;
  label?: string;
  placeholder?:string;
  children?: React.ReactNode;
  notValid?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?:() => void
}

const InputPassWord: React.FC<InputPassWord> = ({styleMask, label, placeholder, children, notValid, ...events}) => {
  const {onChange, onBlur, onFocus} = events
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(notValid);
  const wrapperInput = classNames('input-password', {isNotValid: error})
  const [type, setType] = useState<string>('password');

  const onHandlerEye = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(!showPassword);
    showPassword ? setType('text') : setType('password');
  };


  useEffect(() => {
    setError(notValid);
  }, [notValid])

  return (
    <div className='container-password'>
      <div className={wrapperInput} style={styleMask} >
      <span className="input-password__container">
        <input
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          id='password'
          type={type}
          className="form-input" 
          placeholder={placeholder}
        />
        <button className="eye" onClick={onHandlerEye}>
        {!showPassword ? (
          <img src={eye} alt="" /> 
          ) : (
            <img src={eye_invisible} alt="" />
          )}
        </button>
      </span>
    </div>
    <div className='validMessage'>
        {children}
    </div>
    </div>
    
  )
}

export default InputPassWord;