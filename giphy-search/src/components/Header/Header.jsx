import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import SearchInput from '../SearchInput';
import constants from '../../constants'
import './Header.scss';


export default class Header extends React.Component {

    state = {
        isLoggedIn: false,
        userData: null,
    }

    handleLogIn = responce => {
        console.log(responce);
        this.setState({ isLoggedIn: true });
    }

    handleLogOut = () => {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const {
            handleQuerryChange,
            isGettingData,
            handleGifWidthChange,
            handleMaxCountChange,
            handleRatingValueChange,
            ratingValue
        } = this.props;

        const { isLoggedIn, userData } = this.state;

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
                    userData={userData}
                />

                {!isLoggedIn &&
                    <GoogleLogin
                        clientId={constants.googleClientId}
                        buttonText="Login"
                        onSuccess={this.handleLogIn}
                        cookiePolicy={'single_host_origin'}
                    />
                }

                {isLoggedIn &&
                    <GoogleLogout
                        clientId={constants.googleClientId}
                        buttonText="Logout"
                        onLogoutSuccess={this.handleLogOut}
                    ></GoogleLogout>
                }
            </header>
        );
    }

}