import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import SubscriptionHelper from '@shared/helper/subscription.helper';

import { IUser } from '@shared/interface/user.interface';
import { UserService } from '@shared/service/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() public user!: IUser;
  @Output() isUserDeleted: EventEmitter<IUser> = new EventEmitter();
  private _subscriptionHelper = new SubscriptionHelper();

  constructor(
    public activeModal: NgbActiveModal,
    private _userService: UserService
  ) {}

  deleteRecord() {
    this.isUserDeleted.emit(this.user);
    this._userServiceDelete(this.user);
  }

  private _userServiceDelete(user: IUser) {
    this._subscriptionHelper.add = this._userService.delete(user.id).subscribe({
      next: (response: unknown) => {
        console.log('User deleted successfully!', response);
        this.activeModal.close(this.user);
      },
      error: (errorMessage: string) => console.log(errorMessage),
    });
  }
}
