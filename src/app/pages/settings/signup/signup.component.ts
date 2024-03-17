import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {



  public form: FormGroup;
  @Input() data: any;
  @Input() otpModal: ModalController;
  @Input() signInModal : ModalController;
  constructor(public modalCtrl : ModalController , private userService : UserService,
    private navCtrl: Router,
    private toastCtrl: ToastController
    ) {


    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      terms: new FormControl(false, Validators.requiredTrue),
    });
   }

  ngOnInit() {
  }

  isFieldValid(formControl: AbstractControl) {
    return formControl.valid;
  }

  onDismiss() {
    return this.modalCtrl.dismiss();
  }

  onSignUp() {
    this.userService.signUp(this.data  , this.form.value['name'] , this.form.value['email'],this.form.value['username']).then(async res => {
      console.log(JSON.stringify(res) + 'respone from db save ');
      const toast = await this.toastCtrl.create({
        message: 'Registration successful!',
        duration: 3000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
      // Navigate to the home page after toast is dismissed
      toast.onDidDismiss().then(() => {
        this.modalCtrl.dismiss();
        this.otpModal.dismiss();
        this.signInModal.dismiss();
        this.navCtrl.navigate(['/home'],{ queryParams: { reload: true } });
      });
    });
  }
}
