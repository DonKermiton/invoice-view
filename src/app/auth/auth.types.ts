export interface AuthState {
  user: User;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  firstName: string;
  email: string;
  password: string;
}

export interface User {
  CreatedAt: Date;
  DeletedAt?: Date;
  ID: number;
  UpdatedAt?: Date;
  email: string;
}
