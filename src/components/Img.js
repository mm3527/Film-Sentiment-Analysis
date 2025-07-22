import React, { useState } from "react";
import noPoster from '../assets/no-poster.png';
import { ImgSkeleton } from './Skeleton';

function Img({ url, altText = "Movie poster" }) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const imageSrc = url
    ? `https://image.tmdb.org/t/p/original${url}`
    : noPoster;

  return (
    <div style={{ position: "relative", display: 'flex', justifyContent: 'center' }}>
      {isLoading && <ImgSkeleton style={{ position: "absolute", top: 0, left: 0 }} />}
      <img
        src={imageError ? noPoster : imageSrc}
        alt={imageError ? "No poster available" : altText}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ width: '100%', height: 'auto', display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default Img;
