import React from 'react';
import GifContainer from '../GifContainer';
import './Main.scss';


export default function Main({ searchRequest, maxCount, ratingValue }) {
    return (
        <main>
            <GifContainer
                searchRequest={searchRequest}
                maxCount={maxCount}
                ratingValue={ratingValue}
                key={searchRequest + ratingValue + maxCount}
            />
        </main>
    );

}