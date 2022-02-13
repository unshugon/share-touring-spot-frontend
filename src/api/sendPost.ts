/* eslint-disable @typescript-eslint/restrict-template-expressions */
import axios from 'axios';
import { Session } from 'next-auth';
import loadImage, { LoadImageOptions } from 'blueimp-load-image';
import { PostForm, SessionStatus } from '../../utils/type';

const sendPost = async (session: Session | null, status: SessionStatus, post: PostForm) => {
  const { title, content, images, locate } = post;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('locationtype', 'Point');
  formData.append('latitude', String(locate.lat));
  formData.append('longitude', String(locate.lng));
  await Promise.all(
    images.map(async (image) => {
      const options: LoadImageOptions = {
        maxHeight: 1080,
        maxWidth: 1080,
        canvas: true,
      };
      const canvas = await loadImage(image, options);
      const imageCanvas = canvas.image as HTMLCanvasElement;
      return new Promise((resolve: (value: Blob) => void, reject) => {
        imageCanvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject();
          }
        }, 'image/jepg');
      });
    }),
  ).then((values) => {
    values.forEach((value, i) => {
      const newFile = new File([value], images[i].name);
      formData.append('image', newFile, images[i].name);
    });
  });

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
