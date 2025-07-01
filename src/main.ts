// Punto de entrada de la aplicación
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { enableProdMode } from '@angular/core';
// Registra los elementos personalizados necesarios para SQLite en la web
import { defineCustomElements } from 'jeep-sqlite/loader';
import { environment } from './environments/environment';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Activa el modo de producción si aplica
if (environment.production) {
  enableProdMode();
}

// Inicializa los componentes web del plugin
defineCustomElements(window);

// Inicia la aplicación de Angular con las configuraciones de Ionic
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
