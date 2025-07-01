import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { QuotesService, Quote } from '../services/quotes.service';
import { QuoteCardComponent } from '../components/quote-card/quote-card.component';
import { SettingsService } from '../services/settings.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    QuoteCardComponent,
    RouterLink,
  ],
})
export class HomePage {
  cita!: Quote;

  constructor(private quotesService: QuotesService, private settings: SettingsService) {
    this.obtenerAleatoria();
  }

  async obtenerAleatoria(): Promise<void> {
    this.cita = await this.quotesService.getRandomQuote();
  }

  async borrar(id: number): Promise<void> {
    await this.quotesService.deleteQuote(id);
    await this.obtenerAleatoria();
  }

  get permitirBorrar(): boolean {
    return this.settings.getAllowDeleteOnHome();
  }
}
