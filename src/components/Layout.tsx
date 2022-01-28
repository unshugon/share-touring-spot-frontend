import Head from 'next/head';

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
      <h1>hello</h1>
    </header>
    <main>{children}</main>
    <footer>Share Touring Spot</footer>
  </div>
);

export default Layout;
