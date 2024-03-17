import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.page.html',
  styleUrls: ['./transition.page.scss'],
})
export class TransitionPage implements OnInit {

  isloading = true;
  user;
  constructor( private router : Router , private route : ActivatedRoute) { 

  }
  ngOnInit() {
    setTimeout(() => {
      this.navigateToHome();
    }, 6000);
  }

  navigateToHome(){
    this.router.navigateByUrl("/home");
    this.isloading = false;
  }

}
