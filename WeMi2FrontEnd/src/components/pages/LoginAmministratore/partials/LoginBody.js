import React from 'react';
import { Errors, Username, Password, Buttons } from './partialsBody';


const LoginBody = ({ validita, setSubmitted, getFormData, loginErrorVisible, formData, setLoginErrorVisible }) => (
  <>
    <Username getFormData={getFormData} formData={formData} />
    <Password getFormData={getFormData} formData={formData} />
    <Errors loginErrorVisible={loginErrorVisible} />
    <Buttons
      validita={validita}
      formData={formData}
      setSubmitted={setSubmitted}
      setLoginErrorVisible={setLoginErrorVisible}
    />
  </>
);

LoginBody.displayName = 'LoginBody';

export default LoginBody;
