import { User } from './user.entity';

export interface SignInPayload {
  user: User;
  token: string;
}
