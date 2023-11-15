import { useState } from 'react';
import axios from '../utils/axios';

export const useUploadForm = (url: string) => {
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [serverMessage, setServerMessage] = useState('');
  const [uploadResult, setUploadResult] = useState(null);
  const uploadForm = async (formData: FormData) => {
    setIsError(false);
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          // @ts-ignore
          const progress1 = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress1);
        },
        onDownloadProgress: (progressEvent) => {
          // @ts-ignore
          const progress2 = 50 + (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress2);
        },
      });

      setUploadResult(res.data?.data || null);
    } catch (err) {
      setIsError(true);
      setServerMessage(err?.message || 'File upload error');
    }
  };

  return { uploadForm, isError, progress, setProgress, serverMessage, uploadResult };
};
