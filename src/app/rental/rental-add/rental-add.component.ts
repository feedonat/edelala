import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.scss'],
})
export class RentalAddComponent  implements OnInit {

viewEntered = false;
coverImage = null;
images: any[] = [];
imageUrls : any[] = [];
showError = false
formFinish = false;
errorMsg=""
item: any ;
currentUser = null;
base64Images =[];
itemForm: FormGroup;
rentalForm: FormGroup;

constructor(private formBuilder: FormBuilder) { }

ngOnInit() {
  this.rentalForm = this.formBuilder.group({
    propertyType: ['', Validators.required],
    address: ['', Validators.required],
    desc: ['' , Validators.required],
    rentAmount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
}

saveRental(){
  if (this.rentalForm.valid) {
    console.log(this.rentalForm.value);
    // Here you can submit the form data to your backend or perform any other action
  } else {

  }
}

}


