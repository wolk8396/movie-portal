import React, { useState } from 'react';
import './header.scss'
import classNames from 'classnames';
import Burger from './burger/burger';
import NavigationHeader from './navigation/navigation'
import { nav_header } from '../../../shared/consts/const-nav';
import { logo } from '../../../shared/consts/image';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const links = classNames('links', {isActive: open});
  const nav = classNames('nav', {isActive: open});
  const container = classNames('container-header__nav-yocalab', {isActive: open});
  const header = classNames('navigation', {isActive: open});
  const onMenu = () => setOpen(!open); 

 
  return (
  <nav className={header}>
    <div className="container-header">
      <div className={container}>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt=''/>
        </div>
        <div className={nav} onClick={onMenu}>
          <nav className={links}>
          <NavigationHeader
            classNameUl="navbar-nav-yocalab"
            classNameLi="item-link"
            data={nav_header}
            classNameLink="link"
            open={open}
            title=''
            />
          </nav>
        </div>
      </div>
      <div className="container-header__burger">
        <Burger fn={onMenu} open={open}/>
      </div>
    </div>
  </nav>
  )
}

export default Header;
