/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import sendPost from '../../api/sendPost';
import useInput from '../../hooks/useInput';

type Props = {
  toggleModalOpen: () => void;
};

const PostNew: React.FC<Props> = ({ toggleModalOpen }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [imageFilesState, setImageFilesState] = useState<File[]>([]);
  const [objectUrlsState, setObjectUrlsState] = useState<string[]>([]);

  const nameProperties = useInput('');
  const descriptionProperties = useInput('');

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      setObjectUrlsState([]);
    } else {
      const imageFilesTemp: File[] = [];
      const objectUrlsTemp: string[] = [];
      for (let i = 0; i < files.length; i += 1) {
        imageFilesTemp.push(files[i]);
        objectUrlsTemp.push(window.URL.createObjectURL(files[i]));
      }
      setImageFilesState(imageFilesTemp);
      setObjectUrlsState(objectUrlsTemp);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendPost(session, status, {
      title: nameProperties.value,
      content: descriptionProperties.value,
      images: imageFilesState,
    });
    toggleModalOpen();
    router.push('/');
  };

  return (
    <form action="#" method="POST" className="w-full" onSubmit={onSubmit} autoComplete="off">
      <div className="space-y-6 bg-white px-4 py-5 dark:bg-slate-900 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              名称
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-slate-800 dark:text-gray-300 dark:placeholder-gray-500 sm:text-sm"
                placeholder="例: 宮ヶ瀬ダム"
                required
                {...nameProperties}
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            おすすめポイント
          </label>
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              画像
            </label>
            <div className="mt-1 flex items-center">
              <span className="min-h-14 min-w-14 overflow-hidden lg:flex lg:flex-row">
                {objectUrlsState.length > 0 ? (
                  objectUrlsState.slice(0, 3).map((imageFile) => (
                    <div
                      key={`${imageFile}_div`}
                      className="aspect-1 overflow-hidden rounded-lg bg-gray-100 sm:mb-4 sm:max-h-12 lg:mb-0 lg:mr-4 lg:max-h-16"
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
                  ))
                ) : (
                  <p className="text-gray-700 dark:text-gray-400">画像を選択してください</p>
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleChangeFile}
                required
              />
              <label
                htmlFor="image-upload"
                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                画像を選択
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              位置情報
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-solid border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center text-gray-700 dark:text-gray-300">
                マップ表示予定
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 text-right dark:bg-slate-900 sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-300"
        >
          送信
        </button>
      </div>
    </form>
  );
};

export default PostNew;
