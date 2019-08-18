import React from 'react';
import constants from '../../constants';
import './gifCard.scss';


export default function GifCard({ data, id }) {

  const culcHeight = (width, height) => {
    const dif = constants.gifWidth / width;
    return height * dif;

  }

  return (
    <div
      className="img-container"
      style={{
        width: constants.gifWidth,
        height: culcHeight(data.width, data.height)
      }}
    >
      <img
        src={data.images.preview_gif.url}
        alt='some gif'
        className="card-gif"
        data-id={id}
        width={0}
        height={0}
      />
    </div>
  );
}

