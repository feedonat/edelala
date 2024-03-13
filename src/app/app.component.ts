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
    await StatusBar.setStyle({ style: Style.Light });
    // Make status bar transparent
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setBackgroundColor({ color: '#00000000' }); // Set transparent color
  }
}
