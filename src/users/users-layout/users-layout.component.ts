import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users-layout',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, RouterLink, RouterLinkActive],
  template: `
    <nav mat-tab-nav-bar [tabPanel]="tabPanel" class="w-full mb-4">
      @for (link of navigationLinks; track link.path) {
        <a
          mat-tab-link
          [routerLink]="link.path"
          routerLinkActive
          #rla="routerLinkActive"
          [active]="rla.isActive"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          {{ link.label }}
        </a>
      }
    </nav>
    <mat-tab-nav-panel #tabPanel>
      <router-outlet />
    </mat-tab-nav-panel>
  `,
})
export class UsersLayoutComponent {
  navigationLinks = [
    { path: 'users', label: 'Users' },
    { path: 'users/create', label: 'Create' },
  ];
}
