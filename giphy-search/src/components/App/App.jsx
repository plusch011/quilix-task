import React from 'react';
import Main from '../Main';
import Header from '../Header';
import './App.scss';

export default class App extends React.Component {

    state = {
        searchRequest: '',
        isGettingData: false,
    }

    toggleGettingData = () => {
        const { isGettingData } = this.state;
        this.setState({ isGettingData: !isGettingData });
    }

    handleQuerryChange = e => {
        e.persist();
        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.setState({ searchRequest: e.target.value });
        }, 700);
        
    }

    render() {
        const { searchRequest, isGettingData, chunkSize } = this.state;

        return (
            <>
                <Header
                    inputValue={searchRequest}
                    handleQuerryChange={this.handleQuerryChange}
                    isGettingData={ isGettingData }
                />
                <Main
                    searchRequest={searchRequest}
                    isGettingData={isGettingData}
                    toggleGettingData={this.toggleGettingData}
                />
            </>
        );
    }
};