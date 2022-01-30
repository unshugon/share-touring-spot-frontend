export type User = {
  userId: string;
  username: string;
  email: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  image: string;
  created_by: User | null;
};

export type PostForm = {
  title: string;
  content: string;
  images: File[];
};

export type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';
