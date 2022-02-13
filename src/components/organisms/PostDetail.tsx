/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../../../utils/type';

type Props = {
  post: Post;
};

function PostDetail({ post }: Props) {
  const { title, content, image, location } = post;
  return (
    <div className="grid w-full grid-cols-1 grid-rows-3 items-start gap-x-6 sm:grid-cols-12 sm:gap-y-8 md:grid-rows-none lg:gap-x-8">
      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 sm:col-span-4 md:aspect-w-2 md:aspect-h-3 lg:col-span-5">
        <Image
          src={image}
          layout="fill"
          objectFit="contain"
          alt={title}
          className="object-contain object-center"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-300 sm:pr-12">
          {title}
        </h2>

        <section aria-labelledby="options-heading" className="mt-10">
          <div className="h-48 rounded-md border-2 dark:border-slate-800 md:h-80">
            <p className="max-h-full overflow-y-scroll break-words text-gray-900 dark:text-gray-300">
              {content}
            </p>
          </div>
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
              {location && location.lat !== 0 && location.lng !== 0 && (
                <Link
                  href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=driving`}
                >
                  <a className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 dark:text-gray-300">
                    ここへ行く
                  </a>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PostDetail;
