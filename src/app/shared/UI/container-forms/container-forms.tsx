import React, { FormEvent } from 'react';
import './container-forms.scss'
import NavTitle from '../title-cart/nav-title';
import { DynamicKeyModels } from '../../../core/models/dynamic.key.models';

interface ContainerFormsProps {
  children: React.ReactNode;
  title: string
  link: string;
  classForm: string;
  titleLink: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  styleForms?:DynamicKeyModels
}

const ContainerForms: React.FC<ContainerFormsProps> = (
  {children, title, link, titleLink, onSubmit, styleForms, classForm}
) => {
  return (
    <div className={`container-forms ${classForm}`}>
      <span className='container-forms__title'>{title}</span>
      <form className='container-forms__form' onSubmit={onSubmit} style={styleForms}>
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
