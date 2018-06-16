import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopUpComponent } from "./top-up.component";
import { MaterialModule } from '../../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [TopUpComponent]
})
export class TopUpModule {}
