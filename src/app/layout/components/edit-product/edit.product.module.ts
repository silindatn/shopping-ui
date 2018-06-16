import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductComponent } from './edit-product.component';
import { MaterialModule } from '../../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [EditProductComponent]
})
export class EditProductModule {}
