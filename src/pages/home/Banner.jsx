// src/pages/home/Banner.jsx
import React, { useState, useEffect } from 'react';
import FetchData from '../../hooks/FetchData';
import { BannerSkeleton } from '../../components/Skeleton';
import Img from '../../components/Img';
import './home.css';

function Banner() {
  const { data, loading } = FetchData('/trending/movie/day');
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    // only run once data.results exists and is an array
    if (!loading && Array.isArray(data?.results) && data.results.length) {
      const idx = Math.floor(Math.random() * data.results.length);
      setMovie(data.results[idx]);
    }
  }, [data, loading]);

  // show skeleton while loading or before we pick a movie
  if (loading || !movie) {
    return <BannerSkeleton />;
  }

  return (
    <div className="banner">
      <Img url={movie.backdrop_path} altText={movie.title || movie.name} />

      <div className="banner_contents">
        <h1 className="banner_title">
          {movie.title || movie.name}
        </h1>
        <p className="banner_overview">
          {movie.overview}
        </p>
      </div>

      <div className="mask" />
    </div>
  );
}

export default Banner;
