import { UserInfo, User } from 'firebase/app';

export type User = UserInfo;

export interface AuthStateModel {
  initialized: boolean;
  user?: UserInfo;
  token?:string,
  tokenclaims?:string,
  sessionid?: string,
  siteid?:string,
  usertype?: string,
  error: string;
}


export interface AuthRespModel {
  'userdetails': any,
  'sessionid': string,
  'status': string,
  'status_code': number,
  'natjwt': any,
  'tokenClaims': any,
  'message': string
}