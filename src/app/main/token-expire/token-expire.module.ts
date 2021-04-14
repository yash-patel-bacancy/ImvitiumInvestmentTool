import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenExpireComponent } from './token-expire.component';

@NgModule({
  declarations: [TokenExpireComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: TokenExpireComponent }
    ])
  ],
  exports: [TokenExpireComponent]
})
export class TokenExpireModule { }
