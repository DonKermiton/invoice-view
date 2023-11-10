export interface AuthState {
  user: User;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  user: RegisterUser;
  company: RegisterCompany;
}

export interface RegisterUser {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterCompany {
  companyName: string;
}

export interface User {
  CreatedAt: Date;
  DeletedAt?: Date;
  ID: number;
  UpdatedAt?: Date;
  email: string;
}
