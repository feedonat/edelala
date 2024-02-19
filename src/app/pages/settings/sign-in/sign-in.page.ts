import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SignUpPage } from '../sign-up/sign-up.page';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(private modalCtr : ModalController) { }
  public form: FormGroup;
  ngOnInit() {

    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }


  onDismiss() {
    return this. modalCtr. dismiss();
  }

  async onPresentSignUpModal() {
    const modal = await this.modalCtr.create({
      component: SignUpPage
    });
    return await modal.present();
  }
}
