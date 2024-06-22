import { useState } from 'react';
import axios from 'axios';

const useImageManager = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (file, altText, description) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('altText', altText);
      formData.append('description', description);

      const response = await axios.post('/home/v1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      });

      return response.data.uuid; // Assuming the server responds with the UUID of the uploaded image
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  return { uploadImage, uploadProgress };
};

export default useImageManager;
