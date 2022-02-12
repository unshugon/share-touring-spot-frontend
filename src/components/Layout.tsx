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
  const toggleModalOpen = (state?: boolean) => {
    if (state) {
      setOpen(state);
    } else {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div>
      <Head>
        <title>Share Touring Spot</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta property="og:url" content="https://www.share-touring-spot.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Share Touring Spot" />
        <meta property="og:description" content="ツーリングスポット共有サイトです。" />
        <meta property="og:site_name" content="ツーリングスポット共有サイトです。" />
        <meta property="og:image" content="prod_favicon.svg" />
        <link rel="icon" href={process.env.FAVICON_URL} />
        <link rel="apple-touch-icon" href={process.env.FAVICON_URL} />
        <meta name="description" content="ツーリングスポット共有サイトです。" />
      </Head>
      <header>
        {!asPath.match(/auth\/signin/) && <Header toggleModalOpen={toggleModalOpen} />}
      </header>
      <main className="min-h-screen">
        {children}
        <Modal open={open} setOpen={setOpen}>
          <PostNew toggleModalOpen={toggleModalOpen} />
        </Modal>
      </main>
      <footer className="text-center dark:bg-slate-900 dark:text-gray-300">
        Share Touring Spot
      </footer>
    </div>
  );
};

export default Layout;
