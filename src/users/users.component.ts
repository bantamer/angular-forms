import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { GridCellDirective } from 'grid/grid-cell/grid-cell.directive';
import { QueryStrategy, Strategy } from 'grid/grid-service/grid-strategy';

import { Column } from 'grid/grid-service/grid.service';

import { GridComponent } from 'grid/grid.component';

interface User {
  id: number;
  name: string;
  age: number;
  role: string;
  createdAt: Date;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [GridComponent, GridCellDirective, DatePipe],
  template: `
    <table app-grid [data]="data()" [columns]="columns()">
      <td *appCell="let row; key: 'name'">{{ row.name }}</td>
      <td *appCell="let row; key: 'age'">{{ row.age }}</td>
      <td *appCell="let row; key: 'role'">{{ row.role }}</td>
      <td *appCell="let row; key: 'createdAt'">
        {{ row.createdAt | date }}
      </td>
    </table>
  `,
  providers: [{ provide: Strategy, useClass: QueryStrategy }],
})
export class UsersComponent {
  public readonly columns = signal<Column<User>[]>([
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'createdAt', label: 'Created' },
  ]);

  public data = signal<User[]>([
    { id: 10, name: 'Alice', age: 30, role: 'Admin', createdAt: new Date() },
    { id: 2, name: 'Bob', age: 25, role: 'User', createdAt: new Date() },
    { id: 1, name: 'Ken', age: 35, role: 'Guest', createdAt: new Date() },
  ]);
}
