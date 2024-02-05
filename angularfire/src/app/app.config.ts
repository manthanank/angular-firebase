import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(
      {
        "projectId": "angular-firebase-angularfire",
        "appId": "1:398670920785:web:64777b4d9f204c20964c70",
        "storageBucket": "angular-firebase-angularfire.appspot.com",
        "apiKey": "AIzaSyC9OsfVdm4MX87daetXWyxvSYMxeSuLOOc",
        "authDomain": "angular-firebase-angularfire.firebaseapp.com",
        "messagingSenderId": "398670920785",
        "measurementId": "G-F0CLXJHX2P"
      }))),
    importProvidersFrom(provideFirestore(() => getFirestore()))]
};
