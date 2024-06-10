import "@/styles/globals.css";
import '@aws-amplify/ui-react/styles.css';

import type { AppProps } from "next/app";
import { Amplify } from 'aws-amplify';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import AuthAWS from "@/components/Auth";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "	us-east-1_SeqeBD60b",
      userPoolClientId: "28agse0856a2p1s56br2m33m42",
      identityPoolId: "us-east-1:8be01534-1ef5-43eb-8bef-f6811755a41d",
      loginWith: {
        email: true,
      },
      signUpVerificationMethod: "code",
      userAttributes: {
        email: {
          required: true,
        },
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider>
    <AuthAWS>
      <main>
        <Component {...pageProps} />;
      </main>
    </AuthAWS>
  </ThemeProvider>
}
