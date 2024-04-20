import React from 'react';

import './confirmation.scss'

interface ConfirmationProps {
  title?: string | null
  messages: string,
  children: React.ReactNode;
}

const Confirmation: React.FC<ConfirmationProps> = ({title, messages, children}) => {

  return (
    <div className='confirmation-messages'>
      <span className='confirmation-messages__title'>{title}</span>
      <span className='confirmation-messages__message'>{messages}</span>
      <div className='confirmation-messages__footer'>
        {children}
      </div>
    </div>
  )
}

export default Confirmation;