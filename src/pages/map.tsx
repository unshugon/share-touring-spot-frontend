/* eslint-disable react/function-component-definition */
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR, { Fetcher, Key } from 'swr';
import { Oval } from 'react-loader-spinner';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
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

const clusterOptions = {
  gridSize: 50,
  maxZoom: 15,
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
  const [centerState, setCenterState] = useState<LocationType>({
    lat: 35.661641406637756,
    lng: 139.74180042423825,
  });
  const { data: center } = useSWR<LocationType>('geolocation', locationFetcher);
  const { data: posts } = useSWR<Post[]>(apiUrl, postFetcher, {
    fallbackData: staticPosts,
  });

  useEffect(() => {
    if (posts && center) {
      setCenterState(center);
    }
  }, [center, posts]);

  if (!centerState) {
    return (
      <div className="flex min-h-screen justify-center bg-gray-300 dark:bg-slate-900">
        <Oval height={500} width={80} strokeWidth={10} color="#d1d5db" secondaryColor="##0f172a" />
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={centerState} zoom={9}>
        {posts && (
          <MarkerClusterer
            options={clusterOptions}
            averageCenter
            styles={[
              {
                className: 'rounded-full bg-red-600 outline outline-white',
                textColor: 'white',
                height: 30,
                width: 30,
                url: '',
              },
            ]}
          >
            {(clusterer) =>
              posts.map(
                (post) =>
                  post.location && (
                    <Marker
                      key={post.id}
                      position={post.location}
                      onClick={() => router.push(`/posts/spots/${post.id}`)}
                      clusterer={clusterer}
                      label={{
                        text: post.title,
                        className: 'bg-gray-50 p-2 rounded-md mb-16 text-gray-900',
                      }}
                    />
                  ),
              )
            }
          </MarkerClusterer>
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
    revalidate: 1,
  };
};

export default Map;
