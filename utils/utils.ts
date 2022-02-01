/* eslint-disable import/prefer-default-export */
export const getImageSrc = (src: string): string => {
  if (process.env.NODE_ENV === 'production') {
    return src;
  }
  return '/sample_pic_01.png';
};
