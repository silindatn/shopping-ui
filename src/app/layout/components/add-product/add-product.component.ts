import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../../../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  error: string = null;
  loginForm: FormGroup;
  isLoading = false;
  image = '';

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private http: RequestService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    public toastr: ToastrService,
    vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.createForm();
  }

  onLoggedin() {
    this.isLoading = true;
    const vm = this;
    // vm.loginForm.value.image = vm.image;
    vm.http.Post('http://localhost:8880/product/create', vm.loginForm.value)
      .subscribe((res) => {
        vm.loginForm.markAsPristine();
        vm.isLoading = false;
        if (res['name']) {
          vm.dialogRef.close();
          vm.toastr.success('Product Added successfully', 'NOTE');

        } else {
          vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
        }
      }, (err) => {
        vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
      });
  }
  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.image = reader;
      };
    }
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      image: '',
      price: [0, Validators.required],
      special_discount: 0,
    });
  }

}
