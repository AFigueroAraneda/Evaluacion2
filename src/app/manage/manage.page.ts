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
// Página para crear y eliminar citas manualmente
export class ManagePage {
  // Contenido de la nueva frase
  nuevaFrase = '';
  // Autor de la nueva frase
  nuevoAutor = '';
  // Listado de citas almacenadas
  quotes: Quote[] = [];

  constructor(private quotesService: QuotesService) {
    // Cargar las citas existentes al iniciar
    this.cargarQuotes();
  }

  // Obtiene todas las citas de la base de datos
  private async cargarQuotes(): Promise<void> {
    this.quotes = await this.quotesService.getQuotes();
  }

  // Agrega una nueva cita utilizando los datos del formulario
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

  // Elimina una cita existente por id
  async borrar(id: number): Promise<void> {
    await this.quotesService.deleteQuote(id);
    await this.cargarQuotes();
  }
}
