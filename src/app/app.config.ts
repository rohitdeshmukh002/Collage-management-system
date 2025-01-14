import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
       "projectId": "crud-project-41b22", 
       "appId": "1:1093868407746:web:11ac980dc71afc547fe45b", 
       "storageBucket": "crud-project-41b22.firebasestorage.app", 
       "apiKey":"AIzaSyBgZFtiPjPmh9FFcE8c0hUkgyeL2S3nkyY", 
       "authDomain": "crud-project-41b22.firebaseapp.com", 
       "messagingSenderId": "1093868407746", 
       "measurementId": "G-GCVCN0XQWC" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),]
};
