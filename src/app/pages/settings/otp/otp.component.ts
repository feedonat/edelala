
import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ModalService } from 'src/app/utils/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit , AfterViewChecked {

  @ViewChild('myInput') myInput: ElementRef;
  @Input() signinModal : ModalController;
  otp:string = ''; // Initialize an array with 4 empty strings

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  // Event handler for when a digit is entered
  onDigitEntered(digit: string) {
    this.otp = this.otp.concat(digit);
  }
  @Input() phone;
  isLoading = false;

  constructor(
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private auth: AuthService,
    private  elementRef : ElementRef,
    private modalService : ModalService,
    private router : Router
    ) { }

  ngOnInit() {
    this.modalService.registerModal(this.modalCtrl);
    //let eleId=this.ngOtpInput.getBoxId(0);
    this.ngOtpInput.focusTo(0);
  }

  setVal(val) {
    this.ngOtpInput.setValue(val);
  }

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
      const response = await this.auth.signInWithPhoneNumber('+1' + this.phone);
      console.log(response);       
    } catch(e) {
      console.log(e);
    }
  }

  async verifyOtp() {
    let options: ModalOptions
    try {
      let response = await this.auth.verifyOtp(this.otp);
       console.log("otp response == "+ JSON.stringify( response?.user));  
       let data =  {uid:response.user.uid , phone: response?.user.phoneNumber}
       console.log('route data ' + data)
       this.modalCtrl.dismiss();
       this.router.navigateByUrl('/setting/signup' , { state: data })
       
    } catch(e) {
      console.log(e);
    }
  }
  ngAfterViewChecked() {
      // if (this.myInput && this.myInput.nativeElement) {
      //   this.myInput.nativeElement.focus();
      // }
  }

    // this called every time when user changed the code
onCodeChanged(code: string) {
  console.log('onCodeChange'+code)
}

// this called only if user entered full code
onCodeCompleted(code: string) {
  console.log('onCodeCompleted'+code)
}

onOtpChange(otp) {
  this.otp = otp;
  console.log('on otp change '+otp)
}

config = {
  allowNumbersOnly: true,
  length: 6,
  isPasswordInput: false,
  disableAutoFocus: false,
  placeholder: '',
  inputStyles: {
    'width': '40px',
    'height': '50px'
  }
};

}
