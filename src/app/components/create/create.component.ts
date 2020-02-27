import { Component, OnInit } from "@angular/core";
import { Store } from "@ngxs/store";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {
  AddUser,
  DeleteUser,
  CheckUserName,
  CheckUserEmail,
  MakeDefaultAfterAdd,
  MakeDefaultAfterDelete
} from "../../actions/user.action";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"]
})
export class CreateComponent implements OnInit {
  angForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  addUser(name, email) {
    this.store.dispatch(new AddUser({ name, email }));
    this.store.dispatch(new MakeDefaultAfterAdd({ name, email }));
  }

  deleteUser(name, email) {
    this.store.dispatch(new DeleteUser({ name, email }));
    this.store.dispatch(new MakeDefaultAfterDelete({ name, email }));
  }

  checkUserName(name) {
    this.store.dispatch(new CheckUserName({ name }));
  }

  checkUserEmail(email) {
    this.store.dispatch(new CheckUserEmail({ email }));
  }

  ngOnInit() {}
}
