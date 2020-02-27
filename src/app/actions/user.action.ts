import { User } from "../models/User";

export class AddUser {
  static readonly type = "[User] Add";

  constructor(public payload: User) {}
}

export class DeleteUser {
  static readonly type = "[User] Delete";

  constructor(public payload: User) {}
}
