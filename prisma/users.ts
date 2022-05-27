type User = {
  name: string;
  email: string;
  password: string;
  role: string;
}[];

export const users: User = [
  {
    name: 'User Test',
    email: 'test@test.com',
    password: 'books123',
    role: 'user',
  },
];
