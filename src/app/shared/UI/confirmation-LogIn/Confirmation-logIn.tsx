import React from "react";
import './Confirmation-logIn.scss'
import Button from "../button/button";
import { notifications } from "../../consts/messages";
import { useNavigate } from "react-router-dom";
import { PATHNAMES } from "../../consts/routes";

const ConfirmationLogIn  = () => {
  const navigate = useNavigate();
  return (
    <div className='confirmation-logIn'>
      <span className='confirmation-logIn__message'>{notifications}</span>
      <div className='confirmation-logIn__footer'>
        <Button 
          title={'Sign Up'} 
          className={'green'}
          onClick={() => navigate(`/${PATHNAMES.sign_up}`)}
          style={{maxWidth: '120px', padding: '0.6rem 0'}}
        />
        <Button 
          title={'Sign In'} 
          className={'green'}
          onClick={() => navigate(`/${PATHNAMES.sign_in}`)}
          style={{maxWidth: '120px', padding: '0.6rem 0'}}
        />
      </div>
    </div>
  )
}

export default React.memo(ConfirmationLogIn);
