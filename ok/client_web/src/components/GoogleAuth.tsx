import  { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const GoogleSignIn = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    const onResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response);
    }

    return (
        <GoogleLogin
            clientId={googleClientId}
            buttonText='Login with Google'
            onSuccess={onResponse}
            onFailure={onResponse}
            cookiePolicy={'single_host_origin'}
        />
    );
};