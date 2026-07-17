export class User {
  _id: string;
  prenom: string;
  nom: string;
  email: string;
  age?: Date;
  tel?: number;
  password?: string;
  role: string;
  provider?: string;
  providerId?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  verificationCode?: string | null;
  codeExpiresAt?: Date | null;
  isVerified?: boolean;
  picture?: string;
  isBlocked?: boolean;
  statusCompte?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
