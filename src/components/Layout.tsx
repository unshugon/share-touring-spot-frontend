import Head from 'next/head';
import Header from './organisms/Header';

/* eslint-disable react/function-component-definition */
type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }: Props) => (
  <div>
    <Head>
      <title>Share Touring Spot</title>
      <meta name="description" content="ツーリングスポット共有サイトです。" />
    </Head>
    <header>
      <Header />
    </header>
    <main className='min-h-screen'>{children}</main>
    <footer className='text-center'>Share Touring Spot</footer>
  </div>
);

export default Layout;
