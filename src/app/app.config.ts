import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { firebaseConfig } from '../environments/environment'; 
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
     provideClientHydration(),
     provideAnimationsAsync(),
     provideFirebaseApp(() => initializeApp(firebaseConfig)),
     provideFirestore(() => getFirestore()), 
     provideAuth(() => getAuth()),
     importProvidersFrom(HttpClientModule),
     importProvidersFrom(MatSelectCountryModule.forRoot('en')), 
    ]
};
