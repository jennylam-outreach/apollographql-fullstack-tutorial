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
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
      LOGIN_USER, {
        onCompleted( {login} ) {
          // Safe the login token to localStorage
          localStorage.setItem('agql-token', login as string);   // apollogrqphql-tutorial
          // An example of direct write - Write local data to Apollo cache indicating that the user is logged in
          client.writeData( {
            data : {
              isLoggedIn: true
            }
          });
        }
      }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
