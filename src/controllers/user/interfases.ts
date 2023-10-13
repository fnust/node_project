import { Decorate } from '../common/types';

interface LoginParam {
  email: string;
  password: string;
}

interface RegistrationParam extends LoginParam {
  name: string;
  dateOfBirth: Date;
}

export type RegistrationPayload = Decorate<{ payload: RegistrationParam }>;
export type LoginPayload = Decorate<{ payload: LoginParam }>;
