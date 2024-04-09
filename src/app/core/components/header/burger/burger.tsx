import React from 'react';

import './burger.scss';
import classNames from 'classnames';

interface BurgerProps {
	fn: () => void,
  open: boolean,
}

const Burger: React.FC<BurgerProps> = props => {
  const {open, fn} = props
  const burger = classNames('btn_burger burger_btn-line', {isActive: open});

  return (
    <>
      <button onClick={fn} className={burger}>
        <span className='menu'></span>
      </button>
    </>
  )
}

export default Burger;