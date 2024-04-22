import React, { ChangeEvent, FormEvent, useState } from 'react';
import './sign-up.scss'
import ContainerForms from '../../shared/UI/container-forms/container-forms';
import { PATHNAMES } from '../../shared/consts/routes';
import InputPassWord from '../../shared/UI/input-password/input-password';

import { PasswordRequirement } from '../../shared/consts/passwordRequirement';
import { useHelperPassWordValidator } from '../../core/hooks/validatorHook';
import HelperPassword from './password-helper/passwordHelper';
import Button from '../../shared/UI/button/button';
import { FormDataModel, FormDataValidModel } from '../../core/models/FormData.models';
import { confirmPassword } from '../../shared/consts/messages';

const SignUP: React.FC = () => {
  const { allValuePassword,  checkPassWord} = useHelperPassWordValidator();
  const [notValid, setNotValid] = useState<FormDataValidModel>({
    username: false,
    password: false,
    confPassWord: false,
  });
  const [hint, setHint] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataModel>({
    username: '',
    password: '',
    confPassWord: ''
  });

  const onHepperPassWord = (e: ChangeEvent<HTMLInputElement>) => { 
    const cloneDate = Object.assign({}, formData);
    cloneDate.password = e.target.value;
    checkPassWord(e.target.value);
    setFormData(cloneDate)
  };

  const onHelperOnBlurPassword = () => {
    const cloneValid = Object.assign({}, notValid)
    cloneValid.password = !allValuePassword;
    setNotValid(cloneValid);
    setHint(false);
  }

  const onHelperOnFocus = () => {
    const cloneValid = Object.assign({}, notValid)
    cloneValid.password = false;
    setNotValid(cloneValid);
    setHint(true);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const onHepperPassWordConf = (e: ChangeEvent<HTMLInputElement>) => { 
    const cloneDate = Object.assign({}, formData);
    cloneDate.confPassWord = e.target.value;
    setFormData(cloneDate)
  };

  const onHelperOnBlurPasswordConf = () => {
    const cloneValid = Object.assign({}, notValid);
    if (formData.confPassWord !== formData.password) {
      cloneValid.confPassWord = true;
      setNotValid(cloneValid);
    } else {
      cloneValid.confPassWord = false;
      setNotValid(cloneValid);
    }
  }

  const onHelperOnFocusConf = () => {
    const cloneValid = Object.assign({}, notValid);
    cloneValid.password = false;
    setNotValid(cloneValid);
  }

  return (
    <>
      <ContainerForms 
        title={'Sign Up'} 
        link={`/${PATHNAMES.sign_in}`} 
        titleLink={'Now Sign In'}
        onSubmit={onSubmit}
      >
        <InputPassWord 
          label='password' 
          placeholder='password' 
          onChange={onHepperPassWord}
          onBlur={onHelperOnBlurPassword}
          onFocus={onHelperOnFocus}
          notValid={notValid.password}
        >
          <HelperPassword
            value={formData.password}
            requirements={PasswordRequirement}
            isValidField={hint}
            classUl='hint-password'
            classLi="hints"
          />
        </InputPassWord>
        <InputPassWord 
          label='Confirm password' 
          placeholder='Confirm password' 
          onChange={onHepperPassWordConf}
          onBlur={onHelperOnBlurPasswordConf}
          onFocus={onHelperOnFocusConf}
          notValid={notValid.confPassWord}
        >
          {notValid.confPassWord && <span className='requirements'>{confirmPassword.requirementsMassages}</span>}
        </InputPassWord>
        <Button 
          title={'Sign Up'} 
          type='submit'
          className={'green'}
          style={{maxWidth: '100%', padding: '0.6rem 0'}}
        />
      </ContainerForms>
    </>
  )
};

export default SignUP;