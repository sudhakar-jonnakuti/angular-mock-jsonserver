import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from '@view/user/create/create.component';
import { EditComponent } from '@view/user/edit/edit.component';
import { UserRoutingModule } from '@view/user/user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteComponent } from '@view/user/delete/delete.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgbModule, UserRoutingModule],
})
export class UserModule {}
