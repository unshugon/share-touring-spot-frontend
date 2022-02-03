/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
