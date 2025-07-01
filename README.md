# Evaluacion2

Esta aplicación demostrativa utiliza Ionic y Angular para gestionar y mostrar citas célebres.

## Estructura principal

- **Home** (`src/app/home`) – muestra una cita aleatoria y permite navegar al resto de páginas.
- **Manage** (`src/app/manage`) – formulario para agregar y eliminar citas.
- **Settings** (`src/app/settings`) – opciones de la aplicación.
- **Componentes** (`src/app/components`) – incluye `QuoteCardComponent` para mostrar cada cita.
- **Servicios** (`src/app/services`) – `QuotesService` maneja la base de datos SQLite y `SettingsService` guarda preferencias con Capacitor Preferences.

## Configuración y uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar la aplicación en desarrollo:
   ```bash
   npm start
   ```

## Persistencia de datos

El servicio `QuotesService` utiliza `@capacitor-community/sqlite` para almacenar las citas en una base de datos local. El servicio `SettingsService` guarda las preferencias del usuario (por ejemplo, si se puede borrar una cita en el inicio) usando el plugin `@capacitor/preferences`.

