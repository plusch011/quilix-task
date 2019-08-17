import React from 'react';
import './gifCard.scss';


export default function GifCard({ data, id, gifWidth }) {

  const culcHeight = (width, height) => {
    const dif = gifWidth / width;
  
    return height * dif;
  }

  return (
    <img
      src={ data.images.preview_gif.url }
      alt='some gif'
      className="card-gif"
      data-id={ id }
      height={ culcHeight(data.width, data.height) }
      width={ gifWidth }
    />
  );
}
