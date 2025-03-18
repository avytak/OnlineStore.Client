export interface AuthResponses {}
export interface PasswordValidationResponse {
  valid: boolean;
}

export interface EmailExistenceResponse {
  exists: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    email: string;
  };
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
