import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { MaterialModule } from '../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, PurchaseRoutingModule, MaterialModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [PurchaseComponent]
})

export class PurchaseModule {}
