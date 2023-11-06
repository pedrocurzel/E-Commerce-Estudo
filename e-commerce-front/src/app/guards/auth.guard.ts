import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private http: HttpClient, private alertCtrl: AlertController){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    
        if (await this.authService.isLogged()) {
            try {
                await this.http.post("http://localhost:3000/valida_token", {
                    token: localStorage.getItem("token")
                }).toPromise();
                return true;
            } catch(e) {
                console.log(e);
                localStorage.removeItem("token");
                this.router.navigateByUrl("/login", {replaceUrl: true});
                let alert = await this.alertCtrl.create({
                    animated: true,
                    message: "Sessão expirou, por favor, logue novamente",
                    backdropDismiss: false,
                    buttons: [
                        {
                            text: "Confirmar",
                            handler: () => {
                                alert.dismiss()
                            }
                        }
                    ]
                })
                setTimeout(() => {
                    alert.present();
                }, 30);
                return false;
            }
        }
        this.router.navigateByUrl("/login", {replaceUrl: true});
        return false;
    }
  
}
