import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonNote } from '@ionic/angular/standalone';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QuotesService, Quote } from '../services/quotes.service';
import { QuoteCardComponent } from '../components/quote-card/quote-card.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonNote,
    RouterLink,
    QuoteCardComponent,
  ],
})
export class ManagePage {
  nuevaFrase = '';
  nuevoAutor = '';
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService) {
    this.cargarQuotes();
  }

  private async cargarQuotes(): Promise<void> {
    this.quotes = await this.quotesService.getQuotes();
  }

  async agregar(form: NgForm): Promise<void> {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    await this.quotesService.addQuote(this.nuevaFrase, this.nuevoAutor);
    this.nuevaFrase = '';
    this.nuevoAutor = '';
    form.resetForm();
    await this.cargarQuotes();
  }

  async borrar(id: number): Promise<void> {
    await this.quotesService.deleteQuote(id);
    await this.cargarQuotes();
  }
}
