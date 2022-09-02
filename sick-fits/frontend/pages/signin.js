import React from 'react';
import styled from 'styled-components';
import RequestReset from '../components/RequestReset';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SignInPage = () => (
  <div>
    <SignIn />
    <SignUp />
    <RequestReset />
  </div>
);

export default SignInPage;
