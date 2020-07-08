import React from 'react';
import ApolloClient from "apollo-client";

import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import { LoginForm, Loading } from "../components";
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const [login, { data }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(LOGIN_USER);
  return <LoginForm login={login} />;
}
