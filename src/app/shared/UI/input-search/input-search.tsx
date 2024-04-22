import React from 'react';

import './input-search.scss';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface InputProps {
  label?: string;
  placeholder?: string;
  styleConf?:DynamicKeyModels;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const InputSearch: React.FC<InputProps> = (props) => {
  const {label, placeholder, onChange, onFocus, onBlur, styleConf} = props;
  return (
    <div className='container-input'>
      {label && <label className="title">{label}</label>}
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
  )
}

export default InputSearch;
