import { useState } from "react";

import { getGalleryProductByCode } from "../api/gallery";

export function useGallery() {
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGalleryByCode = async (data) => {
    try {
      setLoading(true);
      const response = await getGalleryProductByCode(data);

      if (Array.isArray(response)) {
        const filteredResponse = response.filter(item => typeof item === 'object'); 
        if (typeof data === 'object') {
            setGallery([...filteredResponse, data]);
        } else {
            setGallery(filteredResponse);
        }
        setLoading(false);
      } else {
        console.error("getGalleryByCode no devolvió un array");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    error,
    loading,
    gallery,
    getGalleryByCode,
  };
}
