/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { Session } from 'next-auth';
import imageCompression from 'browser-image-compression';
import { PostForm, SessionStatus } from '../../utils/type';

const sendPost = async (session: Session | null, status: SessionStatus, post: PostForm) => {
  const { title, content, images } = post;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  const compressedFiles = await Promise.all(
    images.map(async (image) => {
      const compressOption = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 450,
      };
      return imageCompression(image, compressOption);
    }),
  );

  compressedFiles.forEach((image) => {
    formData.append('image', image, image.name);
  });
  formData.append('locationtype', 'Point');
  formData.append('latitude', String(post.locate.lat));
  formData.append('longitude', String(post.locate.lng));

  try {
    if (session && status === 'authenticated') {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/spots/new`, formData, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      });
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/spots/new`, formData);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export default sendPost;
