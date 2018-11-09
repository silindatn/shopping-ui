import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { IUser } from './../../shared/interface/user.interface';
import { RequestService } from '../../shared/services/request.service';
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from '../components/add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns = [
    'name',
    'username',
    'role'
  ];
  dataSource = new MatTableDataSource<IUser>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private http: RequestService, private toastr: ToastrService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  AddUser(): void {
    let dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }

  getUsers() {
    const vm = this;
    vm.http.Get('http://localhost:8880/user/')
      .subscribe((res: IUser[]) => {
        if (res['users']) {
          vm.dataSource.data = res['users'];
        } else {
          vm.toastr.error('No users found', 'NOTE');
        }
      }, (error) => {
        vm.toastr.error('No users found', 'NOTE');
      });
  }

}
