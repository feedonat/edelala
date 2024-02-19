import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInPage } from './sign-in/sign-in.page';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public user: any;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  async openSignInModal() {

    const modal = await this.modalCtrl.create({
      component: SignInPage,
    });

    await modal.present();

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: SignInPage,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
  }

}
