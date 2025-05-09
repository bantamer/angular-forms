import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  template: `
    <main class="h-full w-full flex flex-col justify-center items-center">
      <h2 class="text-8xl mb-8">404</h2>
      <h2 class="text-4xl mb-8">Page not found</h2>
      <a mat-raised-button [routerLink]="'/'">Go Home</a>
    </main>
  `,
})
export class NotFoundComponent {}
