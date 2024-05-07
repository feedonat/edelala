import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { StorageService } from 'src/app/StorageService';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public db : AngularFirestore,
    public storageService : StorageService
  ) {}


  async signUp(user:any, name: string, email: string, username: string) {
    console.log(  'user id was '+ JSON.stringify(user));
    try {
      await this.db.collection('users').doc(user.uid).set({
        phoneNumber: user?.phone,
        name: name,
        email: email,
        username: username
      });

      let userData = new User();
      userData.id = user.uid;
      userData.email = email;
      userData.name = name;
      userData.username = username;
      userData.phone=user?.phone;
      this.storageService.setValue('user' , userData);
      return name;

    } catch (error) {
      console.error('Error saving user information:', error);
      throw error;
    }
  }


}
