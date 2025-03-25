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
  user?: {
    id: number;
    email: string;
  };
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
