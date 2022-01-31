export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  emailVerifiedAt: Date;
  verificationToken: string;
  isActive: boolean;
  role: string;
  createAt: Date;
  updateAt: Date;
}
