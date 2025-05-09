import { Routes } from '@angular/router';
import { UsersLayoutComponent } from 'users/users-layout/users-layout.component';
import { userExistGuard } from 'users/users.router.guard/users.router.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.page.component').then(
            (m) => m.UsersPageComponent,
          ),
      },
      {
        path: 'users/create',
        loadComponent: () =>
          import('./users/users-create.page.component').then(
            (m) => m.UsersCreatePageComponent,
          ),
      },
      {
        path: 'users/:uuid',
        loadComponent: () =>
          import('./users/users-update.page.component').then(
            (m) => m.UsersUpdatePageComponent,
          ),

        canActivate: [userExistGuard],
      },
    ],
  },

  {
    path: 'not-found',
    loadComponent: () =>
      import('./not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
];
