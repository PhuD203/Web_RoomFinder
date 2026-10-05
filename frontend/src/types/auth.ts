export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  userId: number;
  name: string;
  email: string;
  type: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  type: "Admin" | "User";
};
