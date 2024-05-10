import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NewPageRoutingModule } from './new-routing.module';
import { NewPage } from './new.page';
import { RentalService } from '../rental.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RentalService], // Add ImagePicker to providers],
  declarations: [NewPage]
})
export class NewPageModule {}
