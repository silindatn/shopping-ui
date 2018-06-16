import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { IUser } from '../../interface/user.interface';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
    @Input() heading: string;
    @Input() icon: string;
    user:IUser;
    header = 'Dashboard';
    navigation = '/dashboard';
    constructor(public router: Router) {}

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        try{
            if(!this.user.name) {
                this.router.navigate(['/login'], { replaceUrl: true });
            } else {
                this.header = 'Transactions'
                this.navigation = '/transactions';
            }
        } catch(e){
            this.router.navigate(['/login'], { replaceUrl: true });
        }
    }
}
