import React from 'react';
import Loader from "../Loader";
import SearchInput from '../SearchInput';
import './Header.scss';


export default function Header({handleQuerryChange, 
                                isGettingData, 
                                handleGifWidthChange, 
                                handleMaxCountChange, 
                                handleRatingValueChange,
                                ratingValue} ) {
    return (
        <header>
            <h1>Quilix Giphy search</h1>

            <SearchInput 
                isGettingData={isGettingData}
                ratingValue={ratingValue}
                handleMaxCountChange={handleMaxCountChange}
                handleGifWidthChange={handleGifWidthChange}
                handleQuerryChange={handleQuerryChange}
                handleRatingValueChange={handleRatingValueChange}
            />
        </header>
    );

}