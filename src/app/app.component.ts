import { Component } from '@angular/core';
import { StatusBar, StatusBarStyle, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp();
  }
  async initializeApp() {
    StatusBar.setOverlaysWebView({ overlay: false });
  }
}
