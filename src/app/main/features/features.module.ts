import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [FeaturesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: FeaturesComponent },
    ])
  ],
  exports:[FeaturesComponent]
})
export class FeaturesModule { }
