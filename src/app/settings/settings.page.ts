import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonToggle, IonLabel, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonToggle,
    IonLabel,
    IonButton,
    RouterLink,
  ],
})
// Página de configuración de la aplicación
export class SettingsPage {
  constructor(private settingsService: SettingsService) {}

  // Obtiene la preferencia del usuario para permitir borrado en inicio
  get allowDelete(): boolean {
    return this.settingsService.getAllowDeleteOnHome();
  }

  // Actualiza la preferencia del usuario
  set allowDelete(value: boolean) {
    this.settingsService.setAllowDeleteOnHome(value);
  }
}
