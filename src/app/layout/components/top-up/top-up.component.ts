import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IUser } from '../../../shared/interface/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../../shared/services/request.service';
import { MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss']
})

export class TopUpComponent implements OnInit {
  error: string = null;
  loginForm: FormGroup;
  isLoading = false;
  image = '';
  balance: any = {
    _id: '',
    name: '',
    owner: '',
    balance: 0,
    lastTopUpDate: ''
  };
  user: IUser;

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private http: RequestService,
    private dialogRef: MatDialogRef<TopUpComponent>,
    public toastr: ToastrService,
    vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.getBalance();
    this.createForm();
  }
  getBalance() {
    const vm = this;
    this.balance = JSON.parse(sessionStorage.getItem('balance'));
    if (!vm.balance) {
      vm.http.Post('http://localhost:8880/user/account_balance/', { name: vm.user.name })
        .subscribe((res) => {
          if (res['code'] === '00') {
            vm.balance = res['data'];
          } else {
            vm.toastr.error('No account balance found', 'NOTE');
          }
        }, (err) => {
          vm.toastr.error('No account balance found', 'NOTE');
        });
    }
  }

  onLoggedin() {
    this.isLoading = true;
    const vm = this;
    // vm.loginForm.value.image = vm.image;
    vm.http.Post('http://localhost:8880/user/top-up', vm.loginForm.value)
      .subscribe((res) => {
        vm.loginForm.markAsPristine();
        vm.isLoading = false;
        if (res['code'] === '00') {
          vm.dialogRef.close();
          vm.toastr.success('Account Top-Up was successfully', 'NOTE');
        } else {
          vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
        }
      }, (err) => {
        vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      name: this.user.name,
      amount: [0, Validators.required],
    });
  }


}
