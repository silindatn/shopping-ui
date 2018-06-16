import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { routerTransition } from '../router.animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    error: string = null;
    isReissue = false;
    loginForm: FormGroup;
    isLoading = false;
    hide = true;
    isRefresh = false;
    Name = 'Enter your Name';
    Username = 'Enter username';
    Password = 'Enter password';

    constructor(public router: Router,
                private formBuilder: FormBuilder,
                private http: RequestService,
                public toastr:  ToastrService,
                vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.createForm();
    }

    onLoggedin() {
        this.isLoading = true;
        const vm = this;
        vm.http.Post('http://localhost:8880/user/create', vm.loginForm.value)
        .subscribe((res) => {
          vm.loginForm.markAsPristine();
          vm.isLoading = false;
          if (res['token']) {
            sessionStorage.setItem('user', JSON.stringify(res));
            vm.router.navigate(['/dashboard'], { replaceUrl: true });
            localStorage.setItem('isLoggedin', 'true');
          } else {
              vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
          }
        });
    }

    private createForm() {
      this.loginForm = this.formBuilder.group({
        name: ['', Validators.required],
        password: ['', Validators.required],
        role: 'user',
        username: ['', Validators.required],
        remember: false,
      });
    }
}
