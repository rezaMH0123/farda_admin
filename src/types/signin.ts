export type SignInInputsT = {
  userName: string;
  password: string;
};

export interface SiginData {
  access_token: string;
  expire_refresh_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
}
