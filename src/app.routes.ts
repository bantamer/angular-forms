import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'cars',
    loadComponent: () =>
      import('./cars/cars.component').then((m) => m.CarsComponent),
  },
];
