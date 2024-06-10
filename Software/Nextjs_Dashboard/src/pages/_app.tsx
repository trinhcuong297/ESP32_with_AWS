import "@/styles/globals.css";
import '@aws-amplify/ui-react/styles.css';

import type { AppProps } from "next/app";
import { Amplify } from 'aws-amplify';

import AuthAWS from "@/components/Auth";
import Head from "next/head";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "	us-east-1_SeqeBD60b",
      userPoolClientId: "28agse0856a2p1s56br2m33m42",
      identityPoolId: "us-east-1:e0b02e8c-3ee5-4e8a-a456-4f5c6c32eef2",
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
  return <ThemeProvider
  attribute="class"
  defaultTheme="light"
  >
    <Head>
      <title>Legend - Smart Home System</title>
    </Head>
    <AuthAWS>
      <Component {...pageProps} />;
    </AuthAWS>
  </ThemeProvider>
}
