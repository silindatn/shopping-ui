import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { RequestService } from '../shared/services/request.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { IUser } from '../shared/interface/user.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    error: string = null;
    isReissue = false;
    loginForm: FormGroup;
    isLoading = false;
    hide = true;
    isRefresh = false;
    Username = 'Enter username';
    Password = 'Enter password';

    constructor(public router: Router,
        private formBuilder: FormBuilder,
        private http: RequestService,
        public toastr: ToastrService,
        vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.createForm();
    }

    onLoggedin() {
        this.isLoading = true;
        const vm = this;
        vm.http.Post('http://localhost:8880/user/login', vm.loginForm.value)
            .subscribe((res: IUser) => {
                vm.loginForm.markAsPristine();
                vm.isLoading = false;
                if (res.token) {
                    sessionStorage.setItem('user', JSON.stringify(res));
                    if (res.role === 'user') {
                        vm.router.navigate(['/dashboard'], { replaceUrl: true });
                    } else if (res.role === 'admin') {
                        vm.router.navigate(['/transactions'], { replaceUrl: true });
                    }
                    localStorage.setItem('isLoggedin', 'true');
                } else {
                    vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
                }
            }, (err) => {
                vm.isLoading = false;
                vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
            });
    }

    private createForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            remember: false,
        });
    }

}
