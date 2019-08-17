import React from 'react';
import Main from '../Main';
import Header from '../Header';
import './App.scss';

export default class App extends React.Component {

    state = {
        searchRequest: '',
        isGettingData: false,
        gifWidth: 200,
        maxCount: 500,
        ratingValue: 'G',
    }

    toggleGettingData = () => {
        const { isGettingData } = this.state;
        this.setState({ isGettingData: !isGettingData });
    }

    handleQuerryChange = value => {

        clearTimeout(this.querryTimer);

        this.querryTimer = setTimeout(() => {
            this.setState({ searchRequest: value });
        }, 400);

    }

    handleRatingValueChange = e => {
        e.persist();
        clearTimeout(this.ratingTimer);
        this.ratingTimer = setTimeout(() => {
            this.setState({ ratingValue: e.target.value })
        }, 400);
    }

    handleMaxCountChange = e => {
        e.persist();
        console.log('width changes')
        clearTimeout(this.countTimer);
        this.countTimer = setTimeout(() => {
            this.setState({ maxCount: e.target.value })
        }, 400);
    }

    handleGifWidthChange = e => {
        e.persist();
        console.log('width changes')
        clearTimeout(this.gifWidthTimer);
        this.gifWidthTimer = setTimeout(() => {
            this.setState({ gifWidth: e.target.value })
        }, 400);
    }

    render() {
        const { searchRequest, isGettingData, gifWidth, maxCount, ratingValue } = this.state;

        return (
            <>
                <Header
                    inputValue={searchRequest}
                    isGettingData={isGettingData}
                    ratingValue={ratingValue}
                    handleQuerryChange={this.handleQuerryChange}
                    handleGifWidthChange={this.handleGifWidthChange}
                    handleMaxCountChange={this.handleMaxCountChange}
                    handleRatingValueChange={this.handleRatingValueChange}
                />
                <Main
                    searchRequest={searchRequest}
                    isGettingData={isGettingData}
                    gifWidth={gifWidth}
                    maxCount={maxCount}
                    ratingValue={ratingValue}
                    toggleGettingData={this.toggleGettingData}
                />
            </>
        );
    }
};