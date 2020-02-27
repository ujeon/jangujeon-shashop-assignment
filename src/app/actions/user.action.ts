import { User, UserName, UserEmail } from "../models/User";

export class AddUser {
  static readonly type = "[User] Add";

  constructor(public payload: User) {}
}

export class DeleteUser {
  static readonly type = "[User] Delete";

  constructor(public payload: User) {}
}

export class CheckUserName {
  static readonly type = "[User] CheckName";

  constructor(public payload: UserName) {}
}

export class CheckUserEmail {
  static readonly type = "[User] CheckEmail";

  constructor(public payload: UserEmail) {}
}

export class MakeDefaultAfterAdd {
  static readonly type = "[User] MakeDefaultAfterAdd";

  constructor(public payload: User) {}
}

export class MakeDefaultAfterDelete {
  static readonly type = "[User] MakeDefaultAfterDelete";

  constructor(public payload: User) {}
}
