import React from 'react';
import './sign-in.scss'
import ContainerForms from '../../shared/UI/container-forms/container-forms';
import { PATHNAMES } from '../../shared/consts/routes';

const SignIN: React.FC = () => {
  return (
    <>
    <ContainerForms title={'Sign In'} link={`/${PATHNAMES.sign_up}`} titleLink={'Now Sign Up'}>
      <form></form>
    </ContainerForms>
  </>
  )
};

export default SignIN;
