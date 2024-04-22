import React, { useEffect, useRef, useState } from 'react';

import './dialog.scss';

import ReactDOM, { createPortal } from 'react-dom';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface DialogProps {
  children?: React.ReactNode;
  style?:DynamicKeyModels
  open: boolean;
  close: (value: boolean) => void
}

const Dialog: React.FC<DialogProps> = ({children, open, close, style}) => {
  const [showModal, setShowModal] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const handleClickOutside = (e: Event) => {
    const el = e.target as HTMLElement
    const ref = elementRef.current as HTMLElement;
    if (el.contains(ref)) {
      setShowModal(false);
      close(false);
    } 
  };

  useEffect(() => {
    document.addEventListener('click', (e:Event) =>  handleClickOutside(e));

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  },[])

  return (
    <>
      {showModal && createPortal(
        <div className='dialog'>
          <div className='dialog__wrapper' ref={elementRef} style={style}>
            <div className='container'>
              {children}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default Dialog;