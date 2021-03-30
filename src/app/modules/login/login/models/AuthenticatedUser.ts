export class AuthenticatedUser {
  access_token?: string;
  expires_in?: number;
  jti?: string;
  scope?: string;
  token_type?:string;
  roles?: string[];
}
