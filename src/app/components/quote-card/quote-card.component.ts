import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Quote } from '../../services/quotes.service';

// Tarjeta que muestra una cita y permite eliminarla

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton],
  templateUrl: './quote-card.component.html',
  styleUrls: ['./quote-card.component.scss'],
})
export class QuoteCardComponent {
  // Cita a mostrar
  @Input() quote!: Quote;
  // Indica si se muestra el botón de borrar
  @Input() showDelete = false;
  // Evento emitido al borrar la cita
  @Output() delete = new EventEmitter<number>();
}
