/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getImageSrc } from '../../../utils/utils';

type Props = {
  toggleModalOpen: (state?: boolean) => void;
};

function Header({ toggleModalOpen }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <Popover className="relative bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Image
              src="/main_icon.png"
              alt="ヘッダーアイコン"
              width="50px"
              height="50px"
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-900">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <button
              type="button"
              className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
              onClick={() => router.push('/')}
            >
              Home
            </button>
            <button
              type="button"
              className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
              onClick={() => router.push('/')}
            >
              Map
            </button>
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <button
              type="button"
              onClick={() => toggleModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-gray-300"
            >
              Post
            </button>
            {status === 'authenticated' ? (
              <>
                {session && session.user && session.user.image && (
                  <div className="relative ml-8 rounded-full">
                    <Image
                      src={getImageSrc(session.user.image)}
                      alt="user-icon"
                      height={30}
                      width={30}
                      objectFit="contain"
                    />
                  </div>
                )}

                <p className="pl-2 text-gray-500 dark:text-gray-300">{session?.user?.name}</p>
                <button
                  type="button"
                  className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                type="button"
                className="ml-8 whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
                onClick={() => signIn()}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-900">
            <div className="space-y-6 py-6 px-5">
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <button
                  type="button"
                  className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
                  onClick={() => router.push('/')}
                >
                  Home
                </button>

                <button
                  type="button"
                  className="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400"
                  onClick={() => router.push('/')}
                >
                  Map
                </button>
              </div>
              <div>
                {status === 'authenticated' ? (
                  <>
                    {session && session.user && session.user.image && (
                      <div className="relative rounded-full">
                        <Image
                          src={
                            process.env.NODE_ENV === `development`
                              ? '/main_icon.png'
                              : session?.user?.image
                          }
                          alt="user-icon"
                          height={30}
                          width={30}
                          objectFit="contain"
                        />
                      </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300">{session?.user?.name}</p>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-500"
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </p>
                  </>
                ) : (
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-500"
                      onClick={() => signIn()}
                    >
                      Sign in
                    </button>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => toggleModalOpen(false)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-gray-300 dark:hover:text-gray-400"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
