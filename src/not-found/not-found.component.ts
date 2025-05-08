import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <main class="h-full w-full flex flex-col justify-center items-center">
      <h2 class="text-8xl mb-8">404</h2>
      <h2 class="text-4xl mb-8">Page not found</h2>
      <button mat-raised-button (click)="goHome()">Go home</button>
    </main>
  `,
})
export class NotFoundComponent {
  private readonly router = inject(Router);

  goHome(): void {
    this.router.navigate(['/']);
  }
}
