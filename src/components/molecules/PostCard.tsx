import { useState } from 'react';
import { Post } from '../../../util/type';
import Modal from '../organisms/Modal';
import PostDetail from '../organisms/PostDetail';

type Props = {
  post: Post;
};

function PostCard({ post }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div key={post.id} className="group relative">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-contain object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" onClick={() => setOpen(true)} />
            <Modal open={open} setOpen={setOpen}>
              <PostDetail post={post} />
            </Modal>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{post.title}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{post.content}</p>
      </div>
    </div>
  );
}

export default PostCard;
