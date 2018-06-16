import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RequestService } from '../../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../shared/interface/product.interface';
import { IUser } from '../../shared/interface/user.interface';
import * as _ from 'lodash';
import { TopUpComponent } from '../components/top-up/top-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  products: IProduct[] = [];
  balance:any = {
    _id: '',
    name: '',
    owner: '',
    balance: 0,
    lastTopUpDate: ''
  };
  user: IUser;
  product:IProduct;
  selected_product = '';
  isLoading = false;
  final_amount = 0;
  special_discount_amount = 0;
  price_discount = 0;
  constructor(public router: Router,public dialog: MatDialog, private http: RequestService,private toastr: ToastrService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.product = {
      _id: '',
      name: '',
      image: '',
      price: 0,
      special_discount: 0
    }
    this.getBalance();
    this.getProducts();
  }

  count() {
    const found = _.findIndex(this.products, {name: this.selected_product});
    console.log(found);
    console.log(this.selected_product);
    this.product = this.products[found];

  }
  calculate(){
    console.log('dddddddd')
    this.special_discount_amount = this.product.price * (this.product.special_discount/100);
    this.price_discount = this.product.price < 100 ? 0: this.product.price >= 112 && this.product.price <= 115 ?this.product.price * (0.25/100): this.product.price > 120 ?this.product.price * (0.250/100): 0;
    this.final_amount = this.product.price - this.price_discount - this.special_discount_amount;
  }
  topup(){
    let dialogRef = this.dialog.open(TopUpComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getBalance();
    });
  }
  getBalance(){
    const vm = this;
    this.balance = JSON.parse(sessionStorage.getItem('balance'));
    if(!vm.balance) {
        vm.http.Post('http://localhost:8880/user/account_balance/', {name: vm.user.name})
        .subscribe((res) => {
          console.log(res)
          if (res['code'] === '00') {
            vm.balance = res['data'];
          } else {
              vm.toastr.error('No account balance found', 'NOTE');
          }
    });
  }
  }
  getProducts(){
    const vm = this;
        vm.http.Get('http://localhost:8880/product/')
        .subscribe((res: IProduct[]) => {
          console.log(res)
          if (res['products']) {
            vm.products = res['products'];
          } else {
              vm.toastr.error('No prodcts found', 'NOTE');
          }
    });
  }
  onLoggedin() {
    this.isLoading = true;
    const vm = this;
    // vm.loginForm.value.image = vm.image;
    vm.http.Post('http://localhost:8880/product/purchase', {name: vm.user.name, amount: vm.final_amount, product_name: vm.selected_product})
    .subscribe((res) => {
      vm.isLoading = false;
      if (res['code'] === '00') {
        vm.toastr.success('Product purchase successfully', 'NOTE');
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      } else {
          vm.toastr.error('Technical error has occured, please try again later or contact your system administrator', 'ERROR');
      }
    });
}

}
