import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ITransaction } from './../../shared/interface/transaction.interface'
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../shared/services/request.service';
import { IUser } from '../../shared/interface/user.interface';
import { query } from '@angular/core/src/render3/query';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns = [
    'name',
    'user',
    'product',
    'amount',
    'TransactionDate'
  ];
  dataSource = new MatTableDataSource<ITransaction>([]);
  user: IUser;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private http: RequestService,private toastr: ToastrService) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.dataSource.paginator = this.paginator;
    this.getTransactions();
  }
  getTransactions(query: any = {}){
    const vm = this;
    if(this.user.role === 'user'){
      query['user'] = this.user._id;
    }
        vm.http.Post('http://localhost:8880/product/transactions',{query: query})
        .subscribe((res: ITransaction[]) => {
          console.log(res)
          if (res['transactions']) {
            vm.dataSource.data = res['transactions'];
          } else {
              vm.toastr.error('No transactions found', 'NOTE');
          }
    });
  }

}
