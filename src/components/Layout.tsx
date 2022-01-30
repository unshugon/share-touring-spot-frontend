/* eslint-disable react/function-component-definition */
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from './organisms/Header';
import Modal from './organisms/Modal';
import PostNew from './organisms/PostNew';

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }: Props) => {
  const { asPath } = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const toggleModalOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <Head>
        <title>Share Touring Spot</title>
        <link rel="icon" href={process.env.FAVICON_URL} />
        <meta name="description" content="ツーリングスポット共有サイトです。" />
      </Head>
      <header>
        {!asPath.match(/auth\/signin/) && <Header toggleModalOpen={toggleModalOpen} />}
      </header>
      <main className="min-h-screen">{children}</main>
      <Modal open={open} setOpen={setOpen}>
        <PostNew toggleModalOpen={toggleModalOpen} />
      </Modal>
      <footer className="text-center">Share Touring Spot</footer>
    </div>
  );
};

export default Layout;
