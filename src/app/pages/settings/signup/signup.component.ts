import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent  implements OnInit {

  public form: FormGroup;
  constructor(public modalCtrl : ModalController) {
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

}
