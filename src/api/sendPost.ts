/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { Session } from 'next-auth';
import { PostForm, SessionStatus } from '../../utils/type';

const sendPost = async (session: Session | null, status: SessionStatus, post: PostForm) => {
  const { title, content, images } = post;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  images.forEach((image) => {
    formData.append('image', image);
  });

  try {
    if (session && status === 'authenticated') {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/spots/new/`, formData, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/spots/new/`, formData);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export default sendPost;
