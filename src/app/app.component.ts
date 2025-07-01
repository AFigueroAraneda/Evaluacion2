import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';
import { QuotesService } from './services/quotes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  constructor(private quotes: QuotesService) {
    App.addListener('pause', async () => {
      await this.quotes.close();
    });
  }
}
