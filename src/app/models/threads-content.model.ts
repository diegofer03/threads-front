import { User } from "./user.model";


export interface Thread {
  _id: string,
  text: string,
  user: User,
  parent: string | null,
  createdAt: string,
  updatedAt: string,
  likes: number
}
