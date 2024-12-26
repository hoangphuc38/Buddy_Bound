export type TUser = {
  id: number;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  gender: boolean;
  birthday: string;
};

export type TBlockedUser = {
  id: number,
  blockedUser: TUser
}
