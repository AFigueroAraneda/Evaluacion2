import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  // Permite o no borrar citas en la página de inicio
  private allowDeleteOnHome = false;
  private readonly KEY = 'allowDeleteOnHome';

  constructor() {
    this.cargar();
  }

  private async cargar(): Promise<void> {
    const { value } = await Preferences.get({ key: this.KEY });
    this.allowDeleteOnHome = value === 'true';
  }

  getAllowDeleteOnHome(): boolean {
    return this.allowDeleteOnHome;
  }

  async setAllowDeleteOnHome(value: boolean): Promise<void> {
    this.allowDeleteOnHome = value;
    await Preferences.set({ key: this.KEY, value: String(value) });
  }
}
