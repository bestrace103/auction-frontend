import React, { createContext } from 'react';
import axios from 'src/utils/axios';
import { API_PATH } from 'src/config-global';
import {
  ApiContextType,
  UserRegisterType,
  UserLoginType,
  UserVerifyType,
  BidAuctionType,
} from 'src/types';
import { useDispatch } from 'src/store';
import { edit } from 'src/store/reducers/auth';

const ApiContext = createContext<ApiContextType | null>(null);
/* eslint-disable */
export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useDispatch();

  const initialize = async () => {
    const res = await axios.get(API_PATH.AUTH_GET_ME);
    if (!res?.data) return;
    return dispatch(edit(res.data));
  };

  const register = async (data: UserRegisterType) => {
    return await axios.post(API_PATH.AUTH_REGISTER, data);
  };

  const login = async (data: UserLoginType) => {
    return await axios.post(API_PATH.AUTH_LOGIN, data);
  };

  const verifyOtp = async (data: UserVerifyType) => {
    return await axios.post(API_PATH.AUTH_VERIFY_OTP, data);
  };

  const newBidAuction = async (data: BidAuctionType) => {
    return await axios.post(API_PATH.AUCTION_BID, data);
  };

  return (
    <ApiContext.Provider
      value={{
        initialize,
        register,
        login,
        verifyOtp,
        newBidAuction,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
