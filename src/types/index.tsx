import { ReactElement } from 'react';

export type GuardProps = {
  children: ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type UserType = {
  _id: string;
  full_name: string;
  phone_number: string;
  role: string;
};

export type UserRegisterType = {
  fullName: string;
  phoneNumber: string;
};

export type UserLoginType = {
  phoneNumber: string;
};

export type UserVerifyType = {
  phoneNumber: string;
  otpCode: string;
};

export type AuctionType = {
  name: string;
  price: string;
  description: string;
  pictureUrl: string;
};

export type AuctionItem = {
  _id: string;
  auction_name: string;
  auction_price: string;
  description: string;
  image_url: string;
  time_limit: string;
  status: string;
};

export type BidAuctionType = {
  auctionId: string;
  bidPrice: string;
};

export type ApiContextType = {
  initialize: () => Promise<any>;
  register: (data: UserRegisterType) => Promise<any>;
  login: (data: UserLoginType) => Promise<any>;
  verifyOtp: (data: UserVerifyType) => Promise<any>;
  newBidAuction: (data: BidAuctionType) => Promise<any>;
};
