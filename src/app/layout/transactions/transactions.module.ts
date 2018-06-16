import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { MaterialModule } from '../../shared/modules/materialModule';

@NgModule({
    imports: [CommonModule, TransactionsRoutingModule, MaterialModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    declarations: [TransactionsComponent]
})
export class TransactionsModule {}
