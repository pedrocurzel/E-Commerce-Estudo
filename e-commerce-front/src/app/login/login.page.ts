import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private alertCtrl: AlertController, private router: Router) { }

  passwordVisible: boolean = false;

  form = this.formBuilder.group({
    "email": ["", [Validators.required, Validators.email]],
    "password": ["", Validators.required]
  })

  ngOnInit() {
  }

  changePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

    async login() {
        try {
            let response = await this.http.post<loginSuccessInterface>("http://localhost:3000/login", {
                email: this.form.get("email")!.value,
                pass: this.form.get("password")!.value,
            })
            .toPromise();
            
            localStorage.setItem("token", response!.token);
            this.router.navigateByUrl("/home", {replaceUrl:true});
            
        } catch(e: any) {
            let alert = await this.alertCtrl.create({
                message: e.error.message,
                animated: true
            });
            await alert.present();
        }

    
    }
}


interface loginSuccessInterface {
    error: boolean,
    message: String,
    token: string
}