// routes
import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const APP_NAME = process.env.REACT_APP_NAME || 'localhost';
export const HOME_PATH = paths.auth.login;

export const ASSETS_API = process.env.REACT_APP_ASSETS_API;
export const API_URL = process.env.REACT_APP_API_URL;
export const ASSETS_URL = process.env.REACT_APP_ASSETS_URL;

export const PATH_LOGIN = paths.auth.login; // as '/login'
export const PATH_DASHBOARD = paths.dashboard.root; // as '/home'

export const API_PATH = {
    // auth
    AUTH_ROOT: 'auth',
    AUTH_REGISTER: 'auth/user-register',
    AUTH_LOGIN: 'auth/user-login',
    AUTH_VERIFY_OTP: 'auth/user-verifyOtp',
    AUCTION_BID: 'auction/bid',
    AUTH_GET_ME: 'auth/me',
    AUTH_GET_USER_ID: 'auth/get-user-id',
    AUTH_CONFIRM_PHRASE: 'auth/confirm-phrase',

    // chat
    CHAT_ROOT: 'chat',

    // coinflip
    COINFLIP_ROOT: 'coinflip',
};
export const SOCKET_PATH = {
    SIGNOUT: 'auth:signout',
    ALERT: 'alert',
    CHAT: 'chat:message',
    COINFLIP_CREATE: 'coinflip:create',
    COINFLIP_JOIN: 'coinflip:join',
};