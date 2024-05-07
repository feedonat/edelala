import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/internal/operators/finalize';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  uploadPercent: any;
  downloadURL: any;

  constructor(public db : AngularFirestore, private storage: AngularFireStorage) { }
  async addNewItem(user,item,imagesUrl: any[]) {
    item.poster = user;
    item.images =[];
    item.likes = [];
    item.prices =[];
    item.offers =[];
    let documentId = null;
    return this.db.collection('items').add(item).then(ref => {
        documentId = ref.id;  
        for(var i=0;i<imagesUrl.length;i++){
            this.uploadFile(imagesUrl[i],documentId,i);
        }
    })
 }

uploadFile(file,docId,index) {
  const fileData = file;
  const fileRef = this.storage.ref(`items/${docId}/${index}`);
  var uploadTask = fileRef.putString(file, 'base64', { contentType: 'image/png'}).task;
  // get notified when the download URL is available
  this.downloadURL = fileRef.getDownloadURL()
   
}
}
