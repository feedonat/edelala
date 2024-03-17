import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: any[] = [];

  constructor(private modalController: ModalController) { }

  registerModal(modal: any) {
    this.modals.push(modal);
  }

  async closeAllModals() {
    for (const modal of this.modals) {
      console.log(modal.id)
      await modal.dismiss();
    }
    this.modals = [];
  }

}
