import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

interface NavigationLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [MatTabsModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    @if (currentUrl !== '/not-found') {
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
    }
    <mat-tab-nav-panel #tabPanel>
      <router-outlet />
    </mat-tab-nav-panel>
  `,
  standalone: true,
})
export class AppComponent {
  public currentUrl = '';
  readonly navigationLinks: NavigationLink[] = [
    { path: 'users', label: 'Users' },
    { path: 'users/create', label: 'Create' },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }
}
