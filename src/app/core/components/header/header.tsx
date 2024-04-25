import React, { useEffect, useState } from 'react';
import './header.scss'
import classNames from 'classnames';
import Burger from './burger/burger';
import NavigationHeader from './navigation/navigation'
import { nav_header } from '../../../shared/consts/const-nav';
import { logo } from '../../../shared/consts/image';
import { useLocation, useNavigate} from 'react-router-dom';
import Button from '../../../shared/UI/button/button';
import { LogOutAuth, getUser } from '../../services/localstorage.services';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { KEY_LOG_AUTH } from '../../../redux/slices/logSlice';
import { logOut } from '../../../redux/actions/logAction';
import { PATHNAMES } from '../../../shared/consts/routes';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const links = classNames('links', {isActive: open});
  const nav = classNames('nav', {isActive: open});
  const container = classNames('container-header__nav-yocalab', {isActive: open});
  const header = classNames('navigation', {isActive: open});
  const onMenu = () => setOpen(!open);
  const [auth, setAuth] = useState<boolean>(false);
  const {logIn} = useAppSelector(state => state[KEY_LOG_AUTH]);
  const location = useLocation();


  const onLogOut = () => {
    dispatch(logOut(true));
    LogOutAuth();
    setAuth(false);
    if (location.pathname === `/${PATHNAMES.favorites}`) {
      navigate('/')
    };
  }

  useEffect(() => {
    if (getUser() || logIn) setAuth(true);
  }, [logIn])

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
              auth={auth}
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
       {auth && <Button 
          title={"Log Out"} 
          className={'pink'}
          onClick={onLogOut}
          style={{maxWidth: '100px', padding: '0.5rem 0', borderRadius: '13px'}}
        />}
      <div className="container-header__burger">
        <Burger fn={onMenu} open={open}/>
      </div>
    </div>
  </nav>
  )
}

export default Header;
