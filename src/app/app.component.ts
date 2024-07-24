import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { StorageService } from './StorageService';
import { User } from './pages/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public loginUser: User;

  constructor( private storageService : StorageService ,private router: Router) {
    this.initializeApp();
  }
  async initializeApp() {

    this.storageService.getValue('intro').then(u=>{
       console.log("storage value "+ u)
        if(u){
          this.router.navigateByUrl('/home')
        }else{
          this.router.navigateByUrl('/intro')
        }
    });
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Default });
  }

  ngOnInit() {
    this.storageService.getValue('user').then(u=>{
    if(u){
      this.loginUser = u;
    }else{
      this.router.navigateByUrl('/setting/signin')
    }
  });
}
}
