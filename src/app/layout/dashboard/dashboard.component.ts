import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { IUser } from '../../shared/interface/user.interface';
import { RequestService } from '../../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  balance:any = {
    _id: '',
    name: '',
    owner: '',
    balance: 0,
    lastTopUpDate: ''
  };
  user: IUser;

    constructor(private http: RequestService,private toastr: ToastrService) {
        
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.getBalance();
    }
    getBalance(){
      const vm = this;
      this.balance = JSON.parse(sessionStorage.getItem('balance'));
      if(!vm.balance) {
          vm.http.Post('http://localhost:8880/user/account_balance/', {name: vm.user.name})
          .subscribe((res) => {
            if (res['code'] === '00') {
              vm.balance = res['data'];
            } else {
                vm.toastr.error('No account balance found', 'NOTE');
            }
      }, (error) => {
        this.balance = null;
        vm.toastr.error('No account balance found', 'NOTE');
      });
    }
    }

}
