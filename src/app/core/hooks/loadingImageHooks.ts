import { useCallback, useEffect, useState } from "react";

export const useLoadingImage = (src: string): { url: string | undefined; loading: boolean }  => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const loadImage = useCallback(async () => {
    const img = new Image();
      img.src = src;
      try {
        setUrl(src);
        const url = await img.decode();
        setLoading(false);
        return url
      } catch (error) {
        setUrl(src);
        setLoading(false);
      }
    
	}, [url]);

  useEffect(() => {
    loadImage();
  }, []);

  return { url, loading };
}