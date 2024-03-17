import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public db : AngularFirestore
  ) {}


  async signUp(user:any, name: string, email: string, username: string) {
    console.log(  'user id was '+user.uid);
    try {
      await this.db.collection('users').doc(user.uid).set({
        phoneNumber: user.phoneNumber,
        name: name,
        email: email,
        username: username
      });
      return name;
    } catch (error) {
      console.error('Error saving user information:', error);
      throw error;
    }
  }


}
