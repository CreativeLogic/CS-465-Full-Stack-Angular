import { ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptProvider } from './utils/jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

// Update application config to include the interceptor
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    authInterceptProvider,
  ],
};
