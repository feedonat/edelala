import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';
import { SignInPage } from './sign-in.page';
import { OtpComponent } from '../otp/otp.component';
import { AuthService } from '../auth.service';
import { OtpInputDirective } from 'src/app/utils/Directive/otpInputDirective';
import { SignupComponent } from '../signup/signup.component';
import { CodeInputModule } from 'angular-code-input';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule,
    CodeInputModule,
    NgOtpInputModule
  ],
  providers: [AuthService],
  exports:[OtpInputDirective],
  declarations: [SignInPage,OtpComponent , OtpInputDirective , SignupComponent]
})
export class SignInPageModule {}
