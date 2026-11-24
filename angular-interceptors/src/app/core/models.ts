export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserProfile {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface Address {
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
}
