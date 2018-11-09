import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RequestService } from '../../../shared/services/request.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
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
    private dialogRef: MatDialogRef<AddUserComponent>,
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
    vm.http.Post('http://localhost:8880/user/create', vm.loginForm.value)
      .subscribe((res) => {
        vm.loginForm.markAsPristine();
        vm.isLoading = false;
        if (res['token']) {
          vm.dialogRef.close();
          vm.toastr.success('User successfully added', 'NOTE');

        } else {
          vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
        }
      }, (err) => {
        vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
      });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: 'admin',
      username: ['', Validators.required]
    });
  }
}
