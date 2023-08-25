import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import SubscriptionHelper from '@shared/helper/subscription.helper';

import { IUser, IUsersResponse } from '@shared/interface/user.interface';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  submitted = false;
  createForm!: FormGroup;
  private _subscriptionHelper = new SubscriptionHelper();

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.createFormBuilder();
  }

  ngOnDestroy(): void {
    this._subscriptionHelper.unsubscribe();
  }

  createFormBuilder() {
    this.createForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get fc(): { [key: string]: AbstractControl } {
    return this.createForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.createForm.valid) {
      this._userServiceCreate();
    }
  }

  private _userServiceCreate() {
    const id: number = Math.round(Math.random() * 1000000);
    const user: IUser = { id, ...this.createForm.value };

    this._subscriptionHelper.add = this._userService.add(user).subscribe({
      next: (response: IUsersResponse) => {
        console.log('User created successfully!', response);
        this._router.navigateByUrl('user/index');
      },
      error: (errorMessage: string) => console.log(errorMessage),
    });
  }
}
