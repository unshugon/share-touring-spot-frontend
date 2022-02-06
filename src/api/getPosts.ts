/* eslint-disable import/prefer-default-export */
import { API_BASE_URL } from '../../utils/constants';
import { Post } from '../../utils/type';

export const getAllPosts = async () => {
  const res = await fetch(`${API_BASE_URL}/posts/spots/list/`);
  const posts = (await res.json()) as Post[];
  return posts;
};
