import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import SubscriptionHelper from '@shared/helper/subscription.helper';

import { IUser, IUsersResponse } from '@shared/interface/user.interface';
import { UserService } from '@shared/service/user.service';
import { DeleteComponent } from '@view/user/delete/delete.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  errorMessage = '';
  user!: IUser;
  users: IUser[] = [];
  private _subscriptionHelper = new SubscriptionHelper();

  constructor(
    private _userService: UserService,
    private _modalService: NgbModal
  ) {}

  ngOnInit() {
    this._getAllUsers();
  }

  private _getAllUsers = () => {
    this._subscriptionHelper.add = this._userService.getAll().subscribe({
      next: (users: IUsersResponse) => {
        this.users = users.payload;
      },
      error: (errorMessage: string) => {
        this.errorMessage = errorMessage;
      },
    });
  };

  public deleteUserModal(event: Event, user: IUser) {
    event.preventDefault();
    const modalRef = this._modalService.open(DeleteComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then(
      result => {
        console.log(`Closed with: ${JSON.stringify(result, null, 2)}`);
        modalRef.close();
        this._getAllUsers();
      },
      reason => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
        modalRef.close();
      }
    );
  }

  private getDismissReason(reason: unknown): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
