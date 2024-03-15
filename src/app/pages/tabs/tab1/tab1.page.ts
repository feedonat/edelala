import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  categories = [];
  themeToggle: any;
  constructor() {}
  isDarkTheme = false;
  ngOnInit(): void {
    this.categories.push('Rental')
    this.categories.push('Buy&Sell')
    this.categories.push('Daycare')
    this.categories.push('Asbeza')
    this.categories.push('Transfer')
    this.categories.push('Car')
    this.categories.push('Ziwaj')
  }
}
