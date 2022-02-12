import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Post } from '../../../../utils/type';
import { getAllPosts, getPost } from '../../../api/getPosts';
import PostDetail from '../../../components/organisms/PostDetail';

type Props = {
  post: Post;
};

type Params = ParsedUrlQuery & {
  id: string;
};

function PostDetailPage({ post }: Props) {
  return (
    <div className="min-h-screen bg-gray-300 p-11 dark:bg-slate-900">
      <PostDetail post={post} />
    </div>
  );
}

export default PostDetailPage;

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const post = await getPost(params!.id);

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

  return {
    paths,
    fallback: false,
  };
};
