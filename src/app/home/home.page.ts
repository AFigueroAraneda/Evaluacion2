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
// Página de inicio que muestra una cita aleatoria
export class HomePage {
  // Cita actual a mostrar en la tarjeta
  cita!: Quote;

  constructor(private quotesService: QuotesService, private settings: SettingsService) {
    // Obtener una cita al crear la página
    this.obtenerAleatoria();
  }

  // Recupera una cita aleatoria desde el servicio
  async obtenerAleatoria(): Promise<void> {
    this.cita = await this.quotesService.getRandomQuote();
  }

  // Elimina la cita indicada y carga otra aleatoria
  async borrar(id: number): Promise<void> {
    await this.quotesService.deleteQuote(id);
    await this.obtenerAleatoria();
  }

  // Indica si se permite mostrar el botón de borrar en la tarjeta
  get permitirBorrar(): boolean {
    return this.settings.getAllowDeleteOnHome();
  }
}
