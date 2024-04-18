import React, { useEffect, useRef, useState } from 'react';

import './filters.scss'
import Button from '../../../shared/UI/button/button';
import classNames from 'classnames';

interface FiltersProps {
  select?: React.ReactNode,
  sort?:React.ReactNode,
  input?: React.ReactNode
  children?: React.ReactNode;
}

const Filters: React.FC<FiltersProps> = ({select, input, sort}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Sort films');
  const isActive = classNames('filters-menu', {isActive: open});
  const wrapper = classNames('wrapper-filters', {isActive: open})
  const forms = classNames('forms', {isActive: open});
  const elementRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: Event) => {
    const el = e.target as HTMLElement
    const ref = elementRef.current as HTMLElement;
    if (el.contains(ref)) {
      setOpen(false);
      setTitle('Sort films');
    } 
  };

  useEffect(() => {
    document.addEventListener('click', (e:Event) =>  handleClickOutside(e));

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])
  

  const toggleDropdown = () => {
    setOpen(!open);
    !open ? setTitle('Close') : setTitle('Sort films')
  }

  return (
    <div className='filters'>
      <div className={wrapper}>
        {input}
        <Button 
          title={title} 
          className={'pink'}
          onClick={() => toggleDropdown()}
          style={{maxWidth: '200px', padding: '0.6rem 0'}}
        />
      </div>
      <div className={isActive} ref={elementRef}>
        <div className={forms}>
          <div className='wrapper-forms'>
            {input}
            {select}
            {sort}
            <div className='container-btn'>
            <Button 
              title={title} 
              className={'pink'}
              onClick={() => toggleDropdown()}
              style={{maxWidth: '500px', padding: '0.6rem 0'}}
            />
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Filters;