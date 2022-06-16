import React from 'react';
import style from './notFound.module.scss';

const NotFound = () => (
  <div className={style.container}>
    <h1> You seem lost buddy </h1>
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer;
      autoplay;
      clipboard-write;
      encrypted-media;
      gyroscope;
      picture-in-picture"
      allowFullScreen
      autoPlay
    />
  </div>
);

export default NotFound;
