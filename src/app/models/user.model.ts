export interface User {
  _id: string,
  name: string,
  email: string,
  userName: string,
}

export interface Token {
  sub: string,
  user: string,
  iat: number,
  exp: number
}
