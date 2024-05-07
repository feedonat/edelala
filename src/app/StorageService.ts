import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

@Injectable({
    providedIn: 'root'
  })
  export class StorageService {
  
    private _storage: Storage | null = null;

    constructor(private storage: Storage) {
      this.init();
    }
  
    async init() {
      // If using, define drivers here: await this.storage.defineDriver(/*...*/);
      const storage = await this.storage.create();
      this._storage = storage;
    }
  
    // Example method to set a value in storage
    async setValue(key: string, value: any): Promise<void> {
      await this.storage.set(key, value);
    }
  
    // Example method to get a value from storage
    async getValue(key: string): Promise<any> {
      return await this.storage.get(key);
    }
  
    // Example method to remove a value from storage
    async removeValue(key: string): Promise<void> {
      await this.storage.remove(key);
    }
  }