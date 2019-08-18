import React from 'react';
import Main from '../Main';
import HeaderUI from '../HeaderUI';
import './App.scss';

export default class App extends React.Component {

    state = {
        searchRequest: '',
        maxCount: 400,
        ratingValue: 'G',
    }

    handleChange = (e, timer, prop) => {
        e.persist();
        clearTimeout(this[timer]);
        this[timer] = setTimeout(() => {
            this.setState({ [prop]: e.target.value });
        }, 400);

    }

    handleQuerryChange = e => {
        this.handleChange(e, 'querryTimer', 'searchRequest');
    }

    handleRatingValueChange = e => {
        this.handleChange(e, 'ratingTimer', 'ratingValue');
    }

    handleMaxCountChange = e => {
        this.handleChange(e, 'maxCountTimer', 'maxCount');
    }

    render() {
        const { searchRequest, maxCount, ratingValue } = this.state;

        return (
            <>
                <HeaderUI 
                    maxCount={maxCount}
                    ratingValue={ratingValue}
                    handleQuerryChange={this.handleQuerryChange}
                    handleMaxCountChange={this.handleMaxCountChange}
                    handleRatingValueChange={this.handleRatingValueChange}
                />

                <Main
                    searchRequest={searchRequest}
                    maxCount={maxCount}
                    ratingValue={ratingValue}
                />
            </>
        );
    }
};