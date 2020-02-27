import { State, Action, StateContext, Selector } from "@ngxs/store";
import { User } from "../models/User";
import { AddUser, DeleteUser } from "../actions/user.action";

export class UserStateModel {
  users: User[];
}

@State<UserStateModel>({
  name: "users",
  defaults: {
    users: []
  }
})
export class UserState {
  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(AddUser)
  add(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    const state = getState();
    patchState({
      users: [...state.users, payload]
    });
  }

  @Action(DeleteUser)
  delete(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: DeleteUser
  ) {
    const state = getState();
    let updatedUsers = [...state.users];

    for (let i = 0; i <= state.users.length - 1; i++) {
      if (
        state.users[i].email === payload.email &&
        state.users[i].name === payload.name
      ) {
        updatedUsers.splice(i, 1);
        patchState({
          users: updatedUsers
        });
        break;
      } else if (
        (state.users[i].email !== payload.email ||
          state.users[i].name !== payload.name) &&
        i === state.users.length - 1
      ) {
        alert(
          "입력하신 정보와 일치하는 사용자 정보가 존재하지 않아 삭제할 수 없습니다."
        );
      }
    }
  }
}
