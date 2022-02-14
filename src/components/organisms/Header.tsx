/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon, HomeIcon, MapIcon } from '@heroicons/react/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  toggleModalOpen: (state?: boolean) => void;
};

const menuList = [
  {
    title: 'Home',
    icon: HomeIcon,
    link: '/',
  },
  {
    title: 'Map',
    icon: MapIcon,
    link: '/map',
  },
];

function Header({ toggleModalOpen }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <Popover className="relative bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a className="relative">
                <Image
                  src="/main_icon.png"
                  alt="ヘッダーアイコン"
                  height="50px"
                  width="47px"
                  className="h-8 w-auto sm:h-10"
                />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-900">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {menuList.map((menu) => (
              <Link href={menu.link} key={menu.link}>
                <a className="-m-3 flex items-start rounded-lg p-3">
                  <menu.icon className="h-6 w-6 flex-shrink-0 text-gray-300" aria-hidden="true" />
                  <div className="ml-4">
                    <p className="text-base font-medium text-gray-900 dark:text-gray-300">
                      {menu.title}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden items-center justify-end gap-4 md:flex md:flex-1 lg:w-0">
            <button
              type="button"
              onClick={() => toggleModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-gray-300"
            >
              投稿
            </button>
            {status === 'authenticated' ? (
              <>
                {session && session.user && (
                  <div className="-m-3 flex items-start p-3">
                    {session?.user?.image && (
                      <Image
                        src={session.user.image}
                        alt="user-icon"
                        height={30}
                        width={30}
                        className="rounded-full"
                        objectFit="cover"
                      />
                    )}
                    <span className="pl-2 text-gray-500 hover:cursor-default dark:text-gray-300">
                      {session?.user?.name}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-400"
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
          className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-slate-800">
            <div className="space-y-6 py-6 px-5">
              <div className="flex items-center justify-between">
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
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:bg-slate-900">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {menuList.map((menu) => (
                    <Popover.Button key={menu.link}>
                      <Link key={menu.link} href={menu.link}>
                        <a className="-m-3 flex items-center rounded-md p-3">
                          <menu.icon
                            className="h-6 w-6 flex-shrink-0 text-gray-900 dark:text-gray-300"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-300">
                            {menu.title}
                          </span>
                        </a>
                      </Link>
                    </Popover.Button>
                  ))}
                </nav>
              </div>
              <div className="grid gap-4">
                {status === 'authenticated' ? (
                  <>
                    {session && session.user && (
                      <div className="-m-3 flex items-center rounded-md p-3">
                        {session.user.image && (
                          <Image
                            src={session.user.image}
                            alt="user-icon"
                            height={30}
                            width={30}
                            objectFit="cover"
                            className="h-6 w-6 flex-shrink-0 rounded-full"
                          />
                        )}
                        <span
                          className={`ml-3 text-base font-medium text-gray-900 dark:text-gray-300 ${
                            session?.user?.image && `ml-4`
                          }`}
                        >
                          {session?.user?.name}
                        </span>
                      </div>
                    )}
                    <div className="mt-6 text-center text-base font-medium text-gray-500">
                      <button
                        type="button"
                        className="text-gray-500 dark:text-gray-300 "
                        onClick={() => signOut()}
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-6 text-center text-base font-medium text-gray-500">
                    <button
                      type="button"
                      className="text-gray-500 dark:text-gray-300"
                      onClick={() => signIn()}
                    >
                      Sign in
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => toggleModalOpen(false)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-gray-300 dark:hover:text-gray-400"
                >
                  投稿
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
