import React, { FormEvent } from 'react';
import './container-forms.scss'
import NavTitle from '../title-cart/nav-title';

interface ContainerFormsProps {
  children: React.ReactNode;
  title: string
  link: string;
  titleLink: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const ContainerForms: React.FC<ContainerFormsProps> = ({children, title, link, titleLink, onSubmit}) => {
  return (
    <div className='container-forms'>
      <span className='container-forms__title'>{title}</span>
      <form className='container-forms__form' onSubmit={onSubmit}>
        {children}
      </form>
      <div className='container-forms__link'>
        <NavTitle 
          className={'nav'} 
          link={link} 
          title={titleLink}
        />
      </div>
    </div>
  )
};

export default ContainerForms;
