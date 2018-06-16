import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { MaterialModule } from '../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, ProductRoutingModule, MaterialModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ProductComponent]
})
export class ProductModule {}
