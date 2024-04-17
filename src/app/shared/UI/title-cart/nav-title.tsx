import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavTitleProps {
  className: string;
  link: string;
  title?: string | null;
}

const NavTitle: React.FC<NavTitleProps> = ({link, title, className}) => {

  return (
    <>
      <NavLink className={className} to={link}>
        {title}
      </NavLink>
    </>
  )
}

export default NavTitle;