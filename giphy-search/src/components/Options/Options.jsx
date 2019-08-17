import React from 'react';
import Loader from "../Loader";
import './Options.scss';


export default function Options({ handleQuerryChange, isGettingData }) {
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Giphy search..."
                onChange={handleQuerryChange}
            />
            {isGettingData && <Loader />}
        </div>
        <input type="text"/>
    );

}