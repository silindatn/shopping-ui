import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'transactions' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'product', loadChildren: './product/product.module#ProductModule' },
            { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
