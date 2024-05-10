import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FieldValue } from '@angular/fire/firestore';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  uploadPercent: any;
  downloadURL: any;

  constructor(public db : AngularFirestore, private storage: AngularFireStorage) { }
  async addNewItem(user,item,imagesUrl: any[]) {
    console.log('images '+imagesUrl)
    item.poster = user;
    item.images =[];
    item.likes = [];
    item.prices =[];
    item.offers =[];
    item.tags = [];
    item.price = 1000
    item.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    let documentId = null;
    return this.db.collection('rental').add(item).then(ref => {
        documentId = ref.id;  
        for(var i=0;i<imagesUrl.length;i++){
            this.imageUpload(imagesUrl[i],documentId,i);
        }
    })
 }
imageUpload(file,docId,index) {

  //storageRef = this.storage.ref(`items/${documentId}_${index}`);
  //this.task = storageRef.putString(img, 'base64', { contentType: 'image/png'});
  const storageRef = this.storage.ref(`rental/${docId}/${index}`);

  // [START storage_monitor_upload]
  var uploadTask = storageRef.putString(file, 'base64', { contentType: 'image/png'}).task;
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        this.db.doc(`rental/${docId}`).update({images: firebase.firestore.FieldValue.arrayUnion(downloadURL) });
      });
    }
  );
  // [END storage_monitor_upload]
}

getOneItem(id) {
  return this.db.doc(`rental/${id}`).valueChanges();
}

getAllRentals() {
  return this.db.collection('rental').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      console.log("ITEMS OF COLL"+JSON.stringify(Object.assign(id, data)));
      return Object.assign(id, data);

    }))
  )
}
}
