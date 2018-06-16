import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { MaterialModule } from '../shared/modules/materialModule';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
