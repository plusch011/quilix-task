import React from 'react';
import GifContainer from '../GifContainer';
import './Main.scss';


export default function Main(props) {
    return (
        <main>
            <GifContainer
                searchRequest={props.searchRequest}
                isGettingData={props.isGettingData}
                toggleGettingData={props.toggleGettingData}
                chunkSize={props.chunkSize}
                key={props.searchRequest}
            />
        </main>
    );

}