import { Component, OnInit, ViewChild } from '@angular/core';
import { AddProductComponent } from '../components/add-product/add-product.component';
import { EditProductComponent } from '../components/edit-product/edit-product.component';
import { RequestService } from '../../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { isArray } from 'util';
import * as _ from 'lodash';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { IProduct } from './../../shared/interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns = [
    'name',
    'price',
    'special_discount'
  ];
  dataSource = new MatTableDataSource<IProduct>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private http: RequestService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getProducts();
  }
  AddProduct(): void {
    let dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }
  EditProduct(): void {
    let dialogRef = this.dialog.open(EditProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  getProducts() {
    const vm = this;
    vm.http.Get('http://localhost:8880/product/')
      .subscribe((res: IProduct[]) => {
        if (res['products']) {
          vm.dataSource.data = res['products'];
        } else {
          vm.toastr.error('No prodcts found', 'NOTE');
        }
      }, (error) => {
        vm.toastr.error('No prodcts found', 'NOTE');
      });
  }

}
