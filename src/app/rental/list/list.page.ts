import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RentalService } from '../rental.service';
import { of } from 'rxjs/internal/observable/of';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  items: Observable<any>;
  constructor(private rentalService: RentalService , private router:Router) { }

  ngOnInit() {
    this.rentalService.getAllRentals().subscribe((data) => {
      console.log(' data === '+JSON.stringify(data))
      this.items =  of(data);
    })
  }

  itemDetail(id) {
    this.router.navigate(
      [`/item/detail/${id}`]
    )
  }

  add(){
  this.router.navigate(
    [`/rental/new/`]
  )
  }
}
