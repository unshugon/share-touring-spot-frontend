/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const signin = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <div
            className="relative h-12 w-auto hover:cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Image layout="fill" objectFit="contain" src="/main_icon.png" alt="main_icon" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-300">
            Sign in with your account
          </h2>
        </div>
        <button
          type="button"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300"
          onClick={() =>
            signIn('google', {
              callbackUrl: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}`,
            })
          }
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FontAwesomeIcon icon={faGoogle} className="h-5 w-5" />
          </span>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default signin;
