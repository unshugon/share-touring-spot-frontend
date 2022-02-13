/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-props-no-spreading */

import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormEvent, useCallback, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { useRecoilState } from 'recoil';
import { LocationType } from '../../../utils/type';
import sendPost from '../../api/sendPost';
import { isLoadingState } from '../../atoms';
import useInput from '../../hooks/useInput';
import usePreviewImage from '../../hooks/usePreviewImage';

const InputLocation = dynamic(() => import('../molecules/InputLocation'));

type Props = {
  toggleModalOpen: (state?: boolean) => void;
};

const PostNew: React.FC<Props> = ({ toggleModalOpen }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingState);
  const [locationState, setLocationState] = useState<LocationType>({ lat: 0, lng: 0 });
  const [titleState, setTitleState] = useState<string>('');
  const descriptionProperties = useInput('');
  const { imageFiles, previewUrls, handleChangeFile } = usePreviewImage();

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      await sendPost(session, status, {
        title: titleState,
        content: descriptionProperties.value,
        images: imageFiles,
        locate: locationState,
      });
      toggleModalOpen(false);
      setIsLoading(false);
      router.push('/');
    },
    [
      descriptionProperties.value,
      imageFiles,
      titleState,
      router,
      session,
      setIsLoading,
      status,
      toggleModalOpen,
      locationState,
    ],
  );

  return (
    <form action="#" method="POST" className="w-full" onSubmit={onSubmit} autoComplete="off">
      <div className="space-y-6 bg-white px-4 py-5 dark:bg-slate-900 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">名称</p>
            <div className="mt-1 flex rounded-md shadow-sm">
              <InputLocation
                inputPropaties={{
                  type: 'text',
                  name: 'company-website',
                  id: 'company-website',
                  className:
                    'block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm',
                  placeholder: '例: 宮ヶ瀬ダム',
                  required: true,
                  value: titleState,
                }}
                setLocation={setLocationState}
                setTitleState={setTitleState}
                titleState={titleState}
              />
            </div>
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            おすすめポイント
          </span>
          <div className="mt-1">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm"
              placeholder="例: 絶景です"
              required
              {...descriptionProperties}
            />
          </div>
        </div>

        <div className="grid grid-cols-1">
          <div>
            <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">画像</span>
            <div className="mt-1 flex items-center">
              {previewUrls.length > 0 ? (
                <span className="min-h-14 min-w-14 grid grid-cols-4 gap-6 overflow-hidden lg:flex lg:flex-row">
                  {previewUrls.slice(0, 3).map((imageFile) => (
                    <div
                      key={`${imageFile}_div`}
                      className="overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 sm:h-12 sm:w-12 md:h-20 md:w-20 lg:h-16 lg:w-16"
                    >
                      <Image
                        key={`${imageFile}_img`}
                        src={imageFile}
                        alt="プレビュー画像"
                        width={180}
                        height={180}
                        objectFit="contain"
                        className="aspect-1 sm:max-h-12 lg:max-h-40"
                      />
                    </div>
                  ))}
                </span>
              ) : (
                <label
                  htmlFor="select-image-area"
                  className="text-gray-700 hover:cursor-pointer dark:text-gray-400"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="select-image-area"
                    className="hidden"
                    onChange={handleChangeFile}
                    required
                  />
                  画像を選択してください
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-6 bg-white px-4 py-3 text-right dark:bg-slate-900 ">
        <label
          htmlFor="select-image-button"
          className="inline-flex justify-center justify-self-end rounded-md border border-solid  py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:cursor-pointer hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300"
        >
          <input
            type="file"
            accept="image/*"
            id="select-image-button"
            className="hidden"
            onChange={handleChangeFile}
            required
          />
          画像を選択
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center justify-self-end rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300"
        >
          {isLoading ? <Oval height={14} width={20} strokeWidth={10} color="#ffffff" /> : '送信'}
        </button>
      </div>
    </form>
  );
};

export default PostNew;
