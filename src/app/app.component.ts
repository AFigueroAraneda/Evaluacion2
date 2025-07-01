import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { App } from '@capacitor/app';
import { QuotesService } from './services/quotes.service';

// Componente principal de la aplicación
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor(private quotes: QuotesService, private platform: Platform) {
    App.addListener('pause', async () => {
      await this.quotes.close();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.platform.ready();
    this.quotes.iniciarPlugin();
  }
}
