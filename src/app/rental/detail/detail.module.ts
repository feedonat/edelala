import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';

import { DetailPage } from './detail.page';
import { ShellModule } from 'src/app/shell/shell.module';
import { SwiperModule } from 'swiper/angular';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,SwiperModule,
    DetailPageRoutingModule,
    ShellModule,
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        'm': 59
      }
    }),

  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
