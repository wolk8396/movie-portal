import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './sign-up.scss'
import ContainerForms from '../../shared/UI/container-forms/container-forms';
import { PATHNAMES } from '../../shared/consts/routes';
import InputPassWord from '../../shared/UI/input-password/input-password';

import { PasswordRequirement } from '../../shared/consts/passwordRequirement';
import { useHelperPassWordValidator } from '../../core/hooks/validatorHook';
import HelperPassword from './password-helper/passwordHelper';
import Button from '../../shared/UI/button/button';
import { FormDataModel, FormDataValidModel } from '../../core/models/FormData.models';
import { confirmPassword, emailValid } from '../../shared/consts/messages';
import Input from '../../shared/UI/input/input';
import { emailRgx } from '../../shared/consts/regex-email';
import { useCreateUUID } from '../../core/hooks/createUiudHooks';

const SignUP: React.FC = () => {
  const {requirementsMassages, errorMassages} = confirmPassword
  const {uuid} = useCreateUUID();
  const { allValuePassword,  checkPassWord} = useHelperPassWordValidator();
  const [errorMessages, setErrorMessages] = useState<string>(requirementsMassages);
  const [notValid, setNotValid] = useState<FormDataValidModel>({
    email: false,
    password: false,
    confPassWord: false,
  });
  const [formData, setFormData] = useState<FormDataModel>({
    email: '',
    password: '',
    confPassWord: '',
    uuid: uuid,
  });

  const onHelperOnBlurPassword = () => {
    const cloneValid = {...notValid}
    cloneValid.password = !allValuePassword ? true : false;
    setNotValid(cloneValid);
  }

  useEffect(() => {
    if (!!formData.password) {
      const cloneValid = {...notValid}
      cloneValid.password = !allValuePassword ? true : false;
      setNotValid(cloneValid);
    }
  
  }, [allValuePassword, formData]);

  useEffect(() => {
    if (!!formData.confPassWord) {
      const cloneValid = Object.assign({}, notValid);
      formData.confPassWord !== formData.password ?
        cloneValid.confPassWord = true :
        cloneValid.confPassWord = false;
      setNotValid(cloneValid);
    }
  
  }, [formData.confPassWord]);

  useEffect(() => {
    if (!!formData.email) {
      const cloneValid = {...notValid};
      const value = emailRgx.test(formData.email);
      cloneValid.email = value ? 
        cloneValid.email = false: cloneValid.email = true;
      setNotValid(cloneValid);
    }
  }, [formData.email])

  const onHepperPassWord = (e: ChangeEvent<HTMLInputElement>) => { 
    const cloneDate = {...formData};
    cloneDate.password = e.target.value;
    setFormData(cloneDate);
    checkPassWord(e.target.value);
  };

  const onCheckValid = (date: FormDataValidModel) => {
    const validEmail = emailRgx.test(formData.email);

    if (!allValuePassword) {
      date.password = true;
    };

    if (!validEmail) {
      date.email = true;
    };

    
    if (formData.password !== formData.confPassWord || !formData.password) {
      date.confPassWord = true;
      setErrorMessages(errorMassages);
    }
    setNotValid(date);
  }


  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clone = {...notValid};
    const validEmail = emailRgx.test(formData.email);
    if (allValuePassword && formData.password === formData.confPassWord && validEmail) {
      console.log(formData);
    };
    onCheckValid(clone);
  }

  const onHepperPassWordConf = (e: ChangeEvent<HTMLInputElement>) => { 
    const cloneDate = Object.assign({}, formData);
    cloneDate.confPassWord = e.target.value;
    setFormData(cloneDate);
    setErrorMessages(requirementsMassages);
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

  const onHandlerEmailOnBlur = () => {
    const cloneValid = Object.assign({}, notValid);
    const value = emailRgx.test(formData.email);
    cloneValid.email = value ? 
      cloneValid.email = false: cloneValid.email = true;
    setNotValid(cloneValid);
  };

  const onHandlerEmail= (e: ChangeEvent<HTMLInputElement>) => { 
    const cloneDate = Object.assign({}, formData);
    cloneDate.email = e.target.value;
    setFormData(cloneDate);
  };

  return (
    <>
      <ContainerForms 
        title={'Sign Up'} 
        link={`/${PATHNAMES.sign_in}`} 
        titleLink={'Now Sign In'}
        onSubmit={onSubmit}
        styleForms={{height: '500px'}}
        classForm='sign_up'
      >
        <Input 
          placeholder='Email' 
          notValid={notValid.email}
          onChange={onHandlerEmail}
          onBlur={onHandlerEmailOnBlur}
          styleConf={{padding:'2.2% 2%', borderRadius: "20px"}}
          styles={{maxWidth: '100%'}}
        >
          {notValid.email && <span className='requirements'>{emailValid}</span>}
        </Input>
        <InputPassWord 
          label='password' 
          placeholder='password' 
          onChange={onHepperPassWord}
          onBlur={onHelperOnBlurPassword}
          notValid={notValid.password}
        >
          <HelperPassword
            value={formData.password}
            requirements={PasswordRequirement}
            isValidField={notValid.password}
            classUl='hint-password'
            classLi="hints"
          />
        </InputPassWord>
        <InputPassWord 
          label='Confirm password' 
          placeholder='Confirm password' 
          onChange={onHepperPassWordConf}
          onBlur={onHelperOnBlurPasswordConf}
          notValid={notValid.confPassWord}
        >
          {notValid.confPassWord && <span className='requirements'>{errorMessages}</span>}
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