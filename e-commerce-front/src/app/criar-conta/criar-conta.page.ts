import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.page.html',
  styleUrls: ['./criar-conta.page.scss'],
})
export class CriarContaPage implements OnInit {

  constructor(public formBuilder: FormBuilder, private apiService: ApiService, private alertCtrl: AlertController, private router: Router) { }

  passwordVisible: boolean = false;

  form = this.formBuilder.group({
    nome: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    senha: ["", [Validators.required]]
  });

  ngOnInit() {
  }

    changePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
    }

    async salvarConta() {
        let usuarioObj = {
            nome: this.form.get("nome")?.value,
            email: this.form.get("email")?.value,
            senha: this.form.get("senha")?.value,
        };

        try {
            let response = await this.apiService.post("criar-conta", usuarioObj, true);
            let alert = await this.alertCtrl.create({
                message: "Conta criada com sucesso!",
                backdropDismiss: false,
                buttons: [
                    {
                        text: "Ir para tela de login",
                        handler: () => {
                            alert.dismiss();
                            this.router.navigateByUrl("/login", { replaceUrl: true });
                        }
                    }
                ]
            })
            alert.present();
        } catch(error: any) {
            let errorAlert = await this.alertCtrl.create({
                message: error.error.message
            })
            errorAlert.present();
            console.log(error);
        }
    }
}
