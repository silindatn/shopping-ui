import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RequestService } from '../../services/request.service';
import { TopUpComponent } from '../../../layout/components/top-up/top-up.component';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-stat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() data: number;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor(public router: Router,public dialog: MatDialog, private http: RequestService,private toastr: ToastrService) {}

    ngOnInit() {}
    
    topup(){
        let dialogRef = this.dialog.open(TopUpComponent);

        dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/dashboard'], { replaceUrl: true });
        });
    }
}
