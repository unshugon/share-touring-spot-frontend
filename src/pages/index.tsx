/* eslint-disable react/function-component-definition */
import type { GetStaticProps, NextPage } from 'next';
import { API_BASE_URL } from '../../util/constants';
import { Post } from '../../util/type';
import PostCard from '../components/molecules/PostCard';

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }: Props) => (
  <div className="bg-white">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        ツーリングスポット一覧
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/spots/list/`);
  const posts = (await res.json()) as Post[];

  return {
    props: {
      posts,
      revalidate: 3,
    },
  };
};

export default Home;
