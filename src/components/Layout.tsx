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
    <>
      <Head>
        <title>Share Touring Spot</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <header>
        {!asPath.match(/auth\/signin/) && <Header toggleModalOpen={toggleModalOpen} />}
      </header>
      <main className={`${!asPath.match(/auth\/signin/) ? `min-h-[1vh-100px]` : `min-h-screen`}`}>
        {children}
        <Modal open={open} setOpen={setOpen}>
          <PostNew toggleModalOpen={toggleModalOpen} />
        </Modal>
      </main>
      <footer className="text-center dark:bg-slate-900 dark:text-gray-300">
        Share Touring Spot
      </footer>
    </>
  );
};

export default Layout;
