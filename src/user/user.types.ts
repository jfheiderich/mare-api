interface IUser {
  id?: string;
  created_at?: Date;
  destroyed_at?: Date;
  updated_at?: Date;
  name: string;
  email: string;
  password: string;
  role?: string;
}
