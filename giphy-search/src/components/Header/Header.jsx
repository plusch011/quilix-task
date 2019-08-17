import React from 'react';
import Loader from "../Loader";
import Options from '../Options'
import './Header.scss';


export default function Header({ handleQuerryChange, isGettingData }) {
    return (
        <header>
            <h1>Quilix Giphy search</h1>

            <Options
                handleQuerryChange={handleQuerryChange}
                isGettingData={isGettingData}
            />
        </header>
    );

}