import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import Button from "@material-ui/core/Button";
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
        this.setState({ isLoggedIn: true, userData: responce });
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
                <h1>QUILIX GIPHY</h1>

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
                        render={renderProps => (
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='google-login'
                            >Google Login
                            </Button>
                        )}
                        buttonText="Login"
                        onSuccess={this.handleLogIn}
                        cookiePolicy={'single_host_origin'}
                    />
                }

                {isLoggedIn &&
                    <GoogleLogout
                        clientId={constants.googleClientId}
                        render={renderProps => (
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className='google-logout'
                            >Logout
                            </Button>
                        )}
                        buttonText="Logout"
                        onLogoutSuccess={this.handleLogOut}
                    ></GoogleLogout>
                }
            </header>
        );
    }

}