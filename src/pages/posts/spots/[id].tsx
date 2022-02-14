import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import { Post } from '../../../../utils/type';
import { getAllPosts, getPost } from '../../../api/getPosts';

type Props = {
  post: Post;
};

type Params = ParsedUrlQuery & {
  id: string;
};

const PostDetail = dynamic(() => import('../../../components/organisms/PostDetail'));

function PostDetailPage({ post }: Props) {
  console.log(post);
  return (
    <div className="min-h-screen bg-gray-300 p-11 dark:bg-slate-900">
      <PostDetail post={post} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getPost(params!.id);
  console.log('post:', post);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const posts = await getAllPosts();
  const paths = posts.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));
  console.log('paths:', paths);

  return {
    paths,
    fallback: false,
  };
};

export default PostDetailPage;
