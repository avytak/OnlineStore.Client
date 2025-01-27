import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
// import LaraLightBlue from '@primeng/themes/lara-light-blue'; // Використання теми lara-light-blue

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Поточні налаштування Angular
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Додавання анімацій (необхідно для PrimeNG)
    provideAnimations(),

    // Конфігурація PrimeNG із підключенням теми
    providePrimeNG({
      theme: {
        preset: Aura, // Використання теми Lara Light Blue
      },
    }),
  ],
};
