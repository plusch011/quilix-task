import React from 'react';
import './Loader.scss';


export default function Loader(props) {
    return (
        <div className="load-bar">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    );
}