/* eslint-disable react/function-component-definition */
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import useSWR, { Fetcher, Key } from 'swr';
import { API_BASE_URL, GOOGLE_MAP_API_KEY } from '../../utils/constants';
import { LocationType, Post } from '../../utils/type';
import { getAllPosts } from '../api/getPosts';

type Props = {
  fallbackPosts: Post[];
};

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 100px)',
};

const locationFetcher: Fetcher<LocationType> = () =>
  new Promise<LocationType>((resolve, reject) => {
    const onSuccess = ({ coords }: GeolocationPosition) =>
      resolve({ lat: coords.latitude, lng: coords.longitude });

    navigator.geolocation.getCurrentPosition(onSuccess, reject);
  });

const postFetcher: Fetcher<Post[]> = (url: string) =>
  fetch(`${API_BASE_URL}${url}`).then((res) => res.json());
const apiUrl: Key = '/posts/spots/list/';

const Map: React.FC<Props> = ({ fallbackPosts: staticPosts }: Props) => {
  const router = useRouter();
  const [centerState, setCenterState] = useState<LocationType | undefined>(undefined);
  const [size, setSize] = useState<google.maps.Size | undefined>(undefined);
  const { data: center } = useSWR('geolocation', locationFetcher);
  const { data: posts } = useSWR<Post[]>(apiUrl, postFetcher, {
    fallbackData: staticPosts,
  });
  const infoWindowOptions = {
    pixelOffset: size,
  };

  const createOffsetSize = useCallback(() => {
    setSize(new window.google.maps.Size(0, -45));
  }, []);

  useEffect(() => {
    if (!centerState && posts) {
      setCenterState(center);
    }
  }, [center, centerState, posts]);

  if (!centerState) {
    return (
      <div className="flex min-h-screen justify-center bg-gray-300 dark:bg-slate-900">
        <Oval height={500} width={80} strokeWidth={10} color="#d1d5db" secondaryColor="##0f172a" />
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} onLoad={() => createOffsetSize()}>
      <GoogleMap mapContainerStyle={containerStyle} center={centerState} zoom={17}>
        {posts &&
          posts.map(
            (post) =>
              post.location && (
                <button
                  type="button"
                  key={post.title}
                  onClick={() => router.push(`/posts/spots/${post.id}`)}
                >
                  <Marker
                    position={post.location}
                    onClick={() => router.push(`/posts/spots/${post.id}`)}
                  />
                  <InfoWindow position={post.location} options={infoWindowOptions}>
                    <div>
                      <span>{post.title}</span>
                    </div>
                  </InfoWindow>
                </button>
              ),
          )}
      </GoogleMap>
    </LoadScript>
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

export default Map;
