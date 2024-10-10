export interface RegisterFormProps {
  fullname: string;
  email: string;
  password: string;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface ForgotFormProps {
  email: string;
}

export interface ResetPassFormProps {
  newpassword: string;
  confirmpassword: string;
}
