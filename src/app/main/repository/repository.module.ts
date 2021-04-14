import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from './repository.component';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from '../../guards/loggedIn.guard';

@NgModule({
  declarations: [RepositoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RepositoryComponent }
    ])
  ],
  exports: [RepositoryComponent]
})
export class RepositoryModule { }
