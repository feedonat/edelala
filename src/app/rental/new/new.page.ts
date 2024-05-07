import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePicker, ImagePickerOptions, OutputType } from '@ionic-native/image-picker/ngx';
import { Platform , LoadingController,ActionSheetController} from '@ionic/angular'
import { RentalService } from '../rental.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { StorageService } from 'src/app/StorageService';
import { User } from 'src/app/pages/models/user';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  viewEntered = false;
coverImage = null;
images: any[] = [];
imageUrls : any[] = [];
showError = false
formFinish = false;
errorMsg=""
item: any ;
currentUser:User = null;
base64Images =[];
public rentalForm: FormGroup;

constructor(
  private formBuilder: FormBuilder,
    private actionSheetController : ActionSheetController,
    private imagePicker :ImagePicker,
    private loadingCtrl:LoadingController,
    private rentalService :RentalService,
    private toastCtrl: ToastController,
    private alertCtrl :AlertController,
    private storageService : StorageService,
    private plt : Platform
  
  ) { }

ngOnInit() {
  this.rentalForm = this.formBuilder.group({
    propertyType: ['', Validators.required],
    address: ['', Validators.required],
    desc: ['' , Validators.required],
    rentAmount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
  //get current user 
  this.storageService.getValue('user').then(u=>{
    if(u){
      this.currentUser = u;
    }
  });
}

  async saveRental(){
  if (this.rentalForm.valid && this.currentUser) {
    console.log(this.rentalForm.value);
    
    let loading = await this.loadingCtrl.create({
      message: "loading...",
    });
    await loading.present();
    this.rentalService.addNewItem( this.currentUser, this.rentalForm.value , this.images).then(
      async (res) => {
        loading.dismiss();
        let toast = await this.toastCtrl.create({
          duration: 3000,
          message: "Successfully Posted new Item!",
        });
        toast.present();
        console.log("finished: ", res);
      },
      async (err) => {
        await loading.dismiss();
  
        let alert = await this.alertCtrl.create({
          header: "Error",
          message: err.message,
          buttons: ["OK"],
        });
        alert.present();
      }
    );
  
  }
}

pickMultipleImages(){
  var options: ImagePickerOptions ={
    maximumImagesCount:6,
    outputType:OutputType.DATA_URL,
  }
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
      //let filename = results[i].
        let base64Image = 'data:image/jpeg;base64,' + results[i];
        this.base64Images.push(base64Image);
        this.images.push(results[i]);
    }
  }, (err) => { });
}


pickSingleImage(){
  var options: ImagePickerOptions ={
    outputType:OutputType.DATA_URL,
  }
  this.imagePicker.getPictures(options).then((result) => {
    this.coverImage = 'data:image/jpeg;base64,' + result;
    this.images[0].push(this.coverImage);
  }, (err) => {console.log(err) });
}

async addImage(source: CameraSource) {
  await Camera.getPhoto({
  quality: 60,
  allowEditing: true,
  resultType: CameraResultType.DataUrl,
  source
}).then((result) => {
  this.coverImage = 'data:image/jpeg;base64,' + result;
  this.rentalForm.patchValue({ coverImg: result });
},(err) => { console.log(err)});

}

async selectImageSource() {
  const buttons = [
    {
      text: 'Take Photo',
      icon: 'camera',
      handler: () => {
        this.addImage(CameraSource.Camera);
      }
    },
    {
      text: 'Choose From Photos',
      icon: 'image',
      handler: () => {
        this.addImage(CameraSource.Photos);
      }
    }
  ];

  // Only allow file selection inside a browser
  if (!this.plt.is('hybrid')) {
    buttons.push({
      text: 'Choose a File',
      icon: 'attach',
      handler: () => {
        this.fileInput.nativeElement.click();
      }
    });
  }

  const actionSheet = await this.actionSheetController.create({
    header: 'Select Image Source',
    buttons
  });
  await actionSheet.present();
}


b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
}
