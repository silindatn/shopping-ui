import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductComponent } from './add-product.component';
import { MaterialModule } from './../../../shared/modules/materialModule'

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [AddProductComponent]
})
export class AddProductModule {}
