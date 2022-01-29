/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { ChangeEvent, useState } from 'react';

function PostNew() {
  const [imageFilesState, setImageFilesState] = useState<string[]>([]);
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!e) {
      setImageFilesState([]);
    } else {
      const { files } = e.target;
      console.log(files);
      if (!files) {
        setImageFilesState([]);
      } else {
        const imageFilesTemp: string[] = [];
        for (let i = 0; i < files.length; i += 1) {
          imageFilesTemp.push(window.URL.createObjectURL(files[i]));
        }
        setImageFilesState(imageFilesTemp);
      }
    }
  };
  console.log(imageFilesState);
  return (
    <form action="#" method="POST" className="w-full">
      <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
              名称
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="例: 宮ヶ瀬ダム"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="about" className="block text-sm font-medium text-gray-700">
            おすすめポイント
          </label>
          <div className="mt-1">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="例: 絶景です"
              defaultValue=""
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">画像</label>
            <div className="mt-1 flex items-center">
              <span className="min-h-14 min-w-14 inline-block overflow-hidden">
                {imageFilesState.length > 0 ? (
                  imageFilesState.slice(0, 3).map((imageFile) => (
                    <div
                      key={`${imageFile}_div`}
                      className="aspect-square overflow-hidden rounded-lg sm:max-h-12 lg:max-h-16"
                    >
                      <img
                        key={`${imageFile}_img`}
                        src={imageFile}
                        className="h-full object-contain"
                      />
                    </div>
                  ))
                ) : (
                  <p>画像を選択してください</p>
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={handleChangeFile}
                multiple
              />
              <label
                htmlFor="image-upload"
                className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                画像を選択
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">位置情報</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-solid border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          送信
        </button>
      </div>
    </form>
  );
}

export default PostNew;
