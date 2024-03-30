import { User } from "./user.model";


export interface Thread {
  _id: string,
  text: string,
  user: User,
  parent: Thread,
  createdAt: string,
  updatedAt: string,
  likes: number
}

export interface createThread{
  text: string,
  userId: string,
  parentId?: string
}
