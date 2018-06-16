import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from './../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, MaterialModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
