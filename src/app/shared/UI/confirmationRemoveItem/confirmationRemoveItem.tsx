import React from 'react';

import './confirmationRemoveItem.scss'
import { deleteFavoritesText } from '../../consts/messages';
import Button from '../button/button';

interface ConfirmationProps {
  title?: string | null
  open: (value: boolean) => void;
  remove: () => void;
}

const ConfirmationRemoveItem: React.FC<ConfirmationProps> = ({title, open, remove}) => {
  return (
    <div className='confirmation-messages'>
      <span className='confirmation-messages__title'>{title}</span>
      <span className='confirmation-messages__message'>{deleteFavoritesText}</span>
      <div className='confirmation-messages__footer'>
        <Button 
          title={'Close'} 
          className={'pink'}
          onClick={() => open(true)}
          style={{maxWidth: '100px', padding: '0.4rem 0'}}
        />
        <Button 
          title={'Ok'} 
          className={'pink'}
          onClick={remove}
          style={{maxWidth: '100px', padding: '0.6rem 0'}}
        />
      </div>
    </div>
  )
}

export default React.memo(ConfirmationRemoveItem);