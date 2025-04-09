import { UserInformation } from './user-information';

export interface AuthResponses {}
export interface PasswordValidationResponse {
  valid: boolean;
}

export interface EmailExistenceResponse {
  exists: boolean;
}

export interface RegistrationResponse {
  token: string;
  success: boolean;
  message?: string;
  user?: Partial<UserInformation>;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: Partial<UserInformation>
}

export interface AuthenticationData {
  email: string;
  password: string;
}

export interface UsersRegistrationData {
  id: number;
  email: string;
  password: string;
}

export interface VerifyResponse {
  success: boolean;
  message?: string;
  user: UserInformation;
}

export interface SendTokenResponse {
  success: boolean;
  message: string;
}
export interface UpdateUserRequest {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  birthDay?: string;
  phone?: string;
}