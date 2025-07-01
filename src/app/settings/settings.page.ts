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
export class SettingsPage {
  constructor(private settingsService: SettingsService) {}

  get allowDelete(): boolean {
    return this.settingsService.getAllowDeleteOnHome();
  }

  set allowDelete(value: boolean) {
    this.settingsService.setAllowDeleteOnHome(value);
  }
}
