import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { SignInPageModule } from './pages/settings/sign-in/sign-in.module';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ModalService } from './utils/modal.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers, Storage } from '@ionic/storage';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }), // Configure IonicStorageModule
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,SignInPageModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)), 
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore())
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
