import { useLoadingImage } from "../../../core/hooks/loadingImageHooks";

interface ImageProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

const Images: React.FC<ImageProps> = ({src, alt, children}) => {
  const {url, loading} = useLoadingImage(src);
  return (
    <>
      {!loading && <img src={url} alt={alt} />}
      {loading && children}
    </>
    
  ) 
}

export default Images;


