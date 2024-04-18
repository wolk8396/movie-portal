import React, { useEffect, useRef, useState } from 'react';

import './select.scss'
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface SelectProps {
  collection: DynamicKeyModels[];
  title: string;
  onGetValue: (value: DynamicKeyModels) => void;
}

const Select: React.FC<SelectProps> = ({collection, onGetValue, title}) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedValue, setSelectedValue] = useState(title);
  const elementRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const handleOptionClick = (option: HTMLElement, value: DynamicKeyModels) => {
    setSelectedValue(option.textContent || '');
    setIsActive(false);
    onGetValue(value)
  };

  const handleOptionKeyUp = (
    e: React.KeyboardEvent<HTMLElement>, 
    option: HTMLElement, 
    value: DynamicKeyModels
  ) => {
    if (e.key === 'Enter') {
      setSelectedValue(option.textContent || '');
      setIsActive(false);
    }
  };

  const handleClickOutside = (e: Event) => {
    const el = e.target as HTMLElement
    const ref = elementRef.current as HTMLElement;
    const value = elementRef.current && ref.contains(el);
    if (!value) setIsActive(false);
  };
  

  useEffect(() => {
    document.addEventListener('click', (e:Event) =>  handleClickOutside(e));

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])

  return (
    <div className={`custom-select ${isActive ? 'active' : ''}`} ref={elementRef}>
      <button
        className="select-button"
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        aria-expanded={isActive ? 'true' : 'false'}
        aria-controls="select-dropdown"
        onClick={toggleDropdown}
      >
        <span className="selected-value">{selectedValue}</span>
        <span className="arrow"></span>
      </button>
      {isActive && 
         <ul className="select-dropdown" role="listbox" id="select-dropdown">
         { collection.map((item, i) => (
            <li
            key={i}
            onClick={(e) => handleOptionClick(e.currentTarget, item)}
            onKeyUp={(e) => handleOptionKeyUp(e, e.currentTarget, item)}
            tabIndex={0}
         >
           <input type="radio" id="github" name="social-account" />
           <label htmlFor="github">
             {item.title}
           </label>
         </li>
          ))}
        </ul>

      }
      
    </div>
  )
}

export default Select;