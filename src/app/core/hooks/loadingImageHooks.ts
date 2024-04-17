import { useEffect, useState } from "react";

export const useLoadingImage = (src: string): { url: string | undefined; loading: boolean }  => {
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      const img = new Image();
      img.src = src;
      setUrl(src);
      await img.decode();
      setLoading(false);
    };

    loadImage();
  }, [src]);

  return { url, loading };
}