import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import SubscriptionHelper from '@shared/helper/subscription.helper';

import {
  IUser,
  IUserResponse,
  IUsersResponse,
} from '@shared/interface/user.interface';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id!: string;
  user!: IUser;
  submitted = false;
  editForm!: FormGroup;
  private _subscriptionHelper = new SubscriptionHelper();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._userServiceFind();
    this.editFormBuilder();
  }

  editFormBuilder() {
    this.editForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  private _userServiceFind() {
    this.id = this._activeRoute.snapshot.params['id'];
    this._subscriptionHelper.add = this._userService.find(this.id).subscribe({
      next: (user: IUserResponse) => this._setValueEditForm(user.payload),
      error: (errorMessage: string) => console.log(errorMessage),
    });
  }

  private _setValueEditForm(user: IUser) {
    this.user = user;
    this.editForm.patchValue({ ...user });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this._userServiceUpdate();
    }
  }

  private _userServiceUpdate() {
    const id = this._activeRoute.snapshot.params['id'];
    const user = { id, ...this.editForm.value };
    this._subscriptionHelper.add = this._userService.update(user).subscribe({
      next: (response: IUsersResponse) => {
        console.log('User updated successfully!', response);
        this._router.navigateByUrl('user/index');
      },
      error: (errorMessage: string) => console.log(errorMessage),
    });
  }

  onReset(): void {
    this.submitted = false;
    this.editForm.reset({ ...this.user });
  }
}
