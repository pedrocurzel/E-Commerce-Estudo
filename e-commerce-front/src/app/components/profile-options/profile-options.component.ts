import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss'],
})
export class ProfileOptionsComponent  implements OnInit {

  constructor(private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {}

  async confirmarSair() {
    let alert = await this.alertCtrl.create({
        animated: true,
        message: "Tem certeza que deseja sair?",
        buttons: [
            {
                text: "Não",
                role: "dismiss",
                handler: () => {
                    alert.dismiss();
                },
                cssClass: 'dismiss-logout-button'
            },
            {
                text: "Sim",
                role: "logout",
                handler: () => {
                    this.sair(alert);
                },
                cssClass: 'logout-button'
            },
        ]
    });
    alert.present();
  }

  async goToPedidos() {
    this.router.navigateByUrl("pedidos")
  }

  async sair(alert: HTMLIonAlertElement) {
    alert.dismiss();
    localStorage.clear();
    this.router.navigateByUrl("/login", {replaceUrl: true});
  }

}
