import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/utils/modal.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  
  public form: FormGroup;
   data: any;
   loading = false;
  constructor(private userService : UserService,
    private navCtrl: Router,
    private toastCtrl: ToastController,
    private modalService : ModalService,
    private activatedRoute : ActivatedRoute
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
    this.data = window.history.state
    console.log("data from route " +JSON.stringify( this.data))
  }

  isFieldValid(formControl: AbstractControl) {
    return formControl.valid;
  }

  onSignUp() {
    this.userService.signUp(this.data  , this.form.value['name'] , this.form.value['email'],this.form.value['username']).then(async data  => {
      console.log(JSON.stringify(data) + 'respone from db save ');
      const toast = await this.toastCtrl.create({
        message: 'Registration successful!',
        duration: 3000, // Duration in milliseconds
        position: 'bottom' // Position of the toast
      });
      toast.present();
      // Navigate to the home page after toast is dismissed
      toast.onDidDismiss().then(() => {
        this.loading = true;
        this.loadSpinner();
        this.modalService.closeAllModals();
      });
    });
  } 

loadSpinner(){
  setTimeout(() => {
    this.loading = false;
    this.navCtrl.navigateByUrl("/home");
  }, 6000);
}

}
