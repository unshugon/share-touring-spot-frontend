import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Post } from '../../../utils/type';

const Modal = dynamic(() => import('../organisms/Modal'));
const PostDetail = dynamic(() => import('../organisms/PostDetail'));

type Props = {
  post: Post;
};

function PostCard({ post }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const { id, title, content, image } = post;

  return (
    <div key={id} className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 dark:bg-slate-800 lg:h-80">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL={image}
          lazyBoundary="100px"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-gray-300">
            <span aria-hidden="true" className="absolute inset-0" onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={setOpen}>
              <PostDetail post={post} />
            </Modal>
          </h3>
          <p className="mt-1 whitespace-nowrap pr-2 text-sm font-medium text-gray-500 dark:text-gray-300">
            {title}
          </p>
        </div>
        <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900 dark:text-gray-400">
          {content}
        </p>
      </div>
    </div>
  );
}

export default PostCard;
