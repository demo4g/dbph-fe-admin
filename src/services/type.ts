export interface IUploadFileResponse {
  uploadedPath: string;
  uploadedUrl: string;
}

export interface ILoginSuccessResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
}

export interface IUserInfo {
  _id: string;
  username: string;
  email: string;
  status: string;
}
