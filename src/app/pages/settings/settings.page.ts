import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInPage } from './sign-in/sign-in.page';
import { ModalService } from 'src/app/utils/modal.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/StorageService';
import { User } from '../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public loginUser: User;
  constructor(private modalCtrl: ModalController , private modalService : ModalService , private router: Router , private storageService : StorageService) { }

  ngOnInit() {
      this.storageService.getValue('user').then(u=>{
      if(u){
        this.loginUser = u;
      }
    });
     this.modalService.registerModal(this.modalCtrl);
  }

  async openModal() {
     this.router.navigateByUrl('/setting/signin')
  }



}
