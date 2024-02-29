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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  exports:[OtpInputDirective],
  declarations: [SignInPage,OtpComponent , OtpInputDirective , SignupComponent]
})
export class SignInPageModule {}
