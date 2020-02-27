import { State, Action, StateContext, Selector, Store } from "@ngxs/store";
import { User, ValidCheck } from "../models/User";
import {
  AddUser,
  DeleteUser,
  CheckUserName,
  CheckUserEmail,
  MakeDefaultAfterAdd,
  MakeDefaultAfterDelete
} from "../actions/user.action";
import { Injectable } from "@angular/core";

export class UserStateModel {
  users: User[];
}

export class ValidCheckModel {
  isNameExist: ValidCheck[];
  isEmailExist: ValidCheck[];
}

@State<UserStateModel>({
  name: "users",
  defaults: {
    users: []
  }
})
@Injectable()
export class UserState {
  constructor(private store: Store) {}

  @Selector()
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Action(AddUser)
  add(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    const nameValid = this.store.selectSnapshot(ValidState.getNameValid);
    const emailValid = this.store.selectSnapshot(ValidState.getEmailValid);
    const state = getState();
    let isExist = false;

    for (let i = 0; i <= state.users.length - 1; i++) {
      if (
        payload.name === state.users[i].name ||
        payload.name === state.users[i].email
      ) {
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      if (nameValid[0].value === "beforeCheck") {
        alert("이름 👤 중복확인을 해주세요 🔍");
      } else if (emailValid[0].value === "beforeCheck") {
        alert("이메일 ✉️ 중복확인을 해주세요 🔍");
      }

      if (
        nameValid[0].value === "unExist" &&
        emailValid[0].value === "unExist"
      ) {
        patchState({
          users: [...state.users, payload]
        });
      }

      if (nameValid[0].value === "exist" || emailValid[0].value === "exist") {
        alert("이름 혹은 이메일 중복 확인을 다시 한 번 부탁드립니다. 🧐");
      }
    } else {
      alert(
        "이미 등록된 사용자입니다. 이름과 이메일을 다시 한 번 확인해주세요. 🧐"
      );
    }
  }

  @Action(DeleteUser)
  delete(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: DeleteUser
  ) {
    const state = getState();
    let updatedUsers = [...state.users];

    if (state.users.length > 0) {
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
            "입력하신 정보와 일치하는 사용자 정보가 존재하지 않아 삭제할 수 없습니다. 😓"
          );
        }
      }
    } else {
      alert(
        "입력하신 정보와 일치하는 사용자 정보가 존재하지 않아 삭제할 수 없습니다. 😓"
      );
    }
  }
}

@State<ValidCheckModel>({
  name: "validCheck",
  defaults: {
    isNameExist: [{ value: "beforeCheck" }],
    isEmailExist: [{ value: "beforeCheck" }]
  }
})
@Injectable()
export class ValidState {
  constructor(private store: Store) {}

  @Selector()
  static getNameValid(state: ValidCheckModel) {
    return state.isNameExist;
  }

  @Selector()
  static getEmailValid(state: ValidCheckModel) {
    return state.isEmailExist;
  }

  @Action(CheckUserName)
  checkName(
    { patchState }: StateContext<ValidCheckModel>,
    { payload }: CheckUserName
  ) {
    const currentUserList = this.store.selectSnapshot(UserState.getUsers);
    if (currentUserList.length > 0) {
      for (let i = 0; 0 <= currentUserList.length - 1; i++) {
        if (currentUserList[i].name === payload.name) {
          alert("이미 등록된 이름입니다. 🤭");
          patchState({
            isNameExist: [{ value: "exist" }]
          });
          break;
        } else if (
          currentUserList[i].name !== payload.name &&
          i === currentUserList.length - 1
        ) {
          alert("등록 가능한 이름입니다. 🤗");
          patchState({
            isNameExist: [{ value: "unExist" }]
          });
          break;
        }
      }
    } else {
      alert("등록 가능한 이름입니다. 🤗");
      patchState({
        isNameExist: [{ value: "unExist" }]
      });
    }
  }

  @Action(CheckUserEmail)
  checkEmail(
    { patchState }: StateContext<ValidCheckModel>,
    { payload }: CheckUserEmail
  ) {
    const currentUserList = this.store.selectSnapshot(UserState.getUsers);

    if (currentUserList.length > 0) {
      for (let i = 0; 0 <= currentUserList.length - 1; i++) {
        if (currentUserList[i].email === payload.email) {
          alert("이미 사용중인 이메일입니다. 🤭");
          patchState({
            isEmailExist: [{ value: "exist" }]
          });
          break;
        } else if (
          currentUserList[i].email !== payload.email &&
          i === currentUserList.length - 1
        ) {
          alert("사용가능한 이메일입니다. 🤗");
          patchState({
            isEmailExist: [{ value: "unExist" }]
          });
          break;
        }
      }
    } else {
      alert("사용가능한 이메일입니다. 🤗");
      patchState({
        isEmailExist: [{ value: "unExist" }]
      });
    }
  }

  @Action(MakeDefaultAfterAdd)
  makeDefaultAfterAdd(
    { patchState }: StateContext<ValidCheckModel>,
    { payload }: MakeDefaultAfterAdd
  ) {
    const currentUserList = this.store.selectSnapshot(UserState.getUsers);
    for (let i = 0; i <= currentUserList.length - 1; i++) {
      if (
        currentUserList[i].name === payload.name &&
        currentUserList[i].email === payload.email
      ) {
        patchState({
          isNameExist: [{ value: "beforeCheck" }],
          isEmailExist: [{ value: "beforeCheck" }]
        });
        break;
      }
    }
  }

  @Action(MakeDefaultAfterDelete)
  makeDefaultAfterDelete(
    { patchState }: StateContext<ValidCheckModel>,
    { payload }: MakeDefaultAfterDelete
  ) {
    const currentUserList = this.store.selectSnapshot(UserState.getUsers);
    for (let i = 0; i <= currentUserList.length - 1; i++) {
      if (
        currentUserList[i].name !== payload.name &&
        currentUserList[i].email !== payload.email
      ) {
        patchState({
          isNameExist: [{ value: "beforeCheck" }],
          isEmailExist: [{ value: "beforeCheck" }]
        });
        break;
      }
    }
  }
}
