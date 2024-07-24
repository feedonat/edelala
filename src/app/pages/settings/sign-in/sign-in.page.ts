import { Component, model, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ModalOptions } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { OtpComponent } from '../otp/otp.component';
import { ModalService } from 'src/app/utils/modal.service';
import { StorageService } from 'src/app/StorageService';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private modalService : ModalService,
    private storageService :StorageService
  ) { }

  ngOnInit() {
    this.modalService.registerModal(this.modalCtrl);
    this.form = new FormGroup({
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
    });
  }

  async signIn() {
    try {
      if(!this.form.valid) {
        this.form.markAllAsTouched();
        return;
      }
      console.log(this.form.value);

     await this.auth.signInWithPhoneNumber('+1' + this.form.value.phone).then(res=>{
      this.storageService.setValue("intro",true);
         console.log("response from phone authentication "+JSON.stringify(res))
     });
      const options: ModalOptions = {
        component: OtpComponent,
        componentProps: {
          phone: this.form.value.phone,
        },
        mode: 'ios',
        id: 'modalOtp'
      };
      const modal = this.modalCtrl.create(options);
      (await modal).present();
      const data: any = (await modal).onWillDismiss();
      console.log(data);
    } catch(e) {
      console.log(e);
    }
  }
}
