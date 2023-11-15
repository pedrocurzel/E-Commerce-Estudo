import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

    async get(endpoint: string) {
        return await this.http.get(environment.api + endpoint, {
            headers: {
                token: localStorage.getItem("token")!
            }
        }).toPromise() as any;
    }

    async post(endpoint: string, body: any, isAuth = false) {
        return await this.http.post(environment.api + endpoint, body, !isAuth ? {
            headers: {
                token: localStorage.getItem("token")!
            }
        } : {})
        .toPromise();
    }
}
