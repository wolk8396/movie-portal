import React from 'react';

import './spinner.scss'

interface SpinnerProps {
  loading: boolean
}

const Spinner: React.FC<SpinnerProps> = ({loading}) => {
  return (
    <>
      {loading && 
      <div className='spinner'>
        <div className='spinner__container'>
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Spinner;