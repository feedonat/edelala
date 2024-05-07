import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusBarService {

  constructor() { }

  async setStatusBarColor(color: string): Promise<void> {
    try {

      StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setStyle({ style: Style.Default });
      await StatusBar.setBackgroundColor({ color: color });
    } catch (error) {
      console.error('Error setting status bar color:', error);
    }
  }


  async setStatusBarColorDefault(): Promise<void> {
    try {

      StatusBar.setOverlaysWebView({ overlay: true });
      await StatusBar.setStyle({ style: Style.Default });
    } catch (error) {
      console.error('Error setting status bar color:', error);
    }
  }
}