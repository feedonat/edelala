
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit , AfterViewInit {

  @ViewChild('myInput') myInput: ElementRef;
  otp:string = ''; // Initialize an array with 4 empty strings

  // Event handler for when a digit is entered
  onDigitEntered(digit: string) {

    this.otp = this.otp.concat(digit);
    console.log('otp == '+this.otp);
    console.log('digit == '+digit);
  }
  @Input() phone;
  isLoading = false;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService
    ) { }

  ngOnInit() {}

  showLoader(msg) {
    if(!this.isLoading) this.isLoading = true;
    return this.loadingCtrl.create({
      message: msg,
      spinner: 'bubbles'
    }).then(res => {
      res.present().then(() => {
        if(!this.isLoading) {
          res.dismiss().then(() => {
            console.log('abort presenting');
          });
        }
      })
    })
    .catch(e => {
      this.isLoading = false;
      console.log(e);
    })
  }

  hideLoader() {
    if(this.isLoading) this.isLoading = false;
    return this.loadingCtrl.dismiss()
    .then(() => console.log('dismissed'))
    .catch(e => console.log(e));
  }

  async resend() {
    try {
      const response = await this.auth.signInWithPhoneNumber('+91' + this.phone);
      console.log(response);       
    } catch(e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    try {
      const response = await this.auth.verifyOtp(this.otp);
      console.log(response);       
    } catch(e) {
      console.log(e);
    }
    const options: ModalOptions = {
      component: SignupComponent,
      componentProps: {
        //phone: this.form.value.phone
      },
      mode: 'ios'
      //swipeToClose: true
    };

    const modal = this.modalCtrl.create(options);
    (await modal).present();
    const data: any = (await modal).onWillDismiss();
    console.log(data);
  } catch(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    console.log("called one time ")
    this.myInput.nativeElement.focus();
  }

}
