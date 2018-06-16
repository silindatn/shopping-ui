import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserComponent } from './add-user.component';
import { MaterialModule } from '../../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [AddUserComponent]
})
export class AddUserModule {}
