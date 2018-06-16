import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, UsersRoutingModule, MaterialModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [UsersComponent]
})
export class UsersModule {}
