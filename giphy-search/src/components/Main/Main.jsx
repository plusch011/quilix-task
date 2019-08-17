import React from 'react';
import GifContainer from '../GifContainer';
import './Main.scss';


export default function Main({
    searchRequest,
    isGettingData, 
    toggleGettingData,
    gifWidth,
    maxCount,
    ratingValue,
}) {
    return (
        <main>
            <GifContainer
                searchRequest={searchRequest}
                isGettingData={isGettingData}
                toggleGettingData={toggleGettingData}
                gifWidth={gifWidth}
                maxCount={maxCount}
                ratingValue={ratingValue}
                key={searchRequest + ratingValue + maxCount}
            />
        </main>
    );

}