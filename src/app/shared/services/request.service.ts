import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class RequestService {
    constructor(public http: HttpClient) {}
    public Get(url) {
    return  this.http.get(url).pipe(map((res) => {
            return res;
    }));
    }
    public Post(url, data) {
    return  this.http.post(url, data).pipe(map((res) => {
            return res;
    }));
    }
}
