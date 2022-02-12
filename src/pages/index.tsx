/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/function-component-definition */
import type { GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import useSWR, { Fetcher, Key } from 'swr';
import { Oval } from 'react-loader-spinner';
import { API_BASE_URL } from '../../utils/constants';
import { Post } from '../../utils/type';
import { getAllPosts } from '../api/getPosts';
import PostCard from '../components/molecules/PostCard';

type Props = {
  fallbackPosts: Post[];
};

const fetcher: Fetcher<Post[]> = (url: string) =>
  fetch(`${API_BASE_URL}${url}`).then((res) => res.json());
const apiUrl: Key = '/posts/spots/list/';

const Home: NextPage<Props> = ({ fallbackPosts: staticPosts }: Props) => {
  const { data: posts, mutate } = useSWR<Post[]>(apiUrl, fetcher, {
    fallbackData: staticPosts,
  });
  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-300">
          ツーリングスポット一覧
        </h2>
        {posts ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <Oval
              height={500}
              width={80}
              strokeWidth={10}
              color="#d1d5db"
              secondaryColor="##0f172a"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const staticPosts = await getAllPosts();

  return {
    props: {
      posts: staticPosts,
    },
    revalidate: 3,
  };
};

export default Home;
