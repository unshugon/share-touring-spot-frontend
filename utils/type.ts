export type User = {
  userId: string;
  username: string;
  email: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  location?: LocationType;
  image: string;
  created_by: User | null;
};

export type PostForm = {
  title: string;
  content: string;
  images: File[];
  locate: LocationType;
};

export type SessionStatus = 'authenticated' | 'loading' | 'unauthenticated';

export type LocationType = {
  lat: number;
  lng: number;
};
