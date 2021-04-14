import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../core/modules/shared.module';
import { AuthGuard } from '../../guards/auth.guard';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', canActivate : [AuthGuard], component: AccountComponent }
    ])
  ],
  exports:[AccountComponent]
})
export class AccountModule { }
