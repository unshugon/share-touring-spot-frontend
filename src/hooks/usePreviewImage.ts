import { ChangeEvent, useState } from 'react';

const usePreviewImage = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrl] = useState<string[]>([]);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      setPreviewUrl([]);
    } else {
      const imageFilesTemp: File[] = [];
      const objectUrlsTemp: string[] = [];
      Array.from(files).forEach((file) => {
        imageFilesTemp.push(file);
        objectUrlsTemp.push(window.URL.createObjectURL(file));
      });
      setImageFiles(imageFilesTemp);
      setPreviewUrl(objectUrlsTemp);
    }
  };

  return {
    imageFiles,
    previewUrls,
    handleChangeFile,
  };
};

export default usePreviewImage;
