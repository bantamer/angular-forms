import { Component, signal } from '@angular/core';
import { GridCellDirective } from 'grid/grid-cell/grid-cell.directive';
import { GridPaginationComponent } from 'grid/grid-pagination/grid-pagination.component';
import { GridPaginationDirective } from 'grid/grid-pagination/grid-pagination.directive';
import { Column } from 'grid/grid-service/grid.service';
import { Strategy } from 'grid/grid-strategy/grid-strategy';
import { QueryStrategy } from 'grid/grid-strategy/query-strategy';

import { GridComponent } from 'grid/grid.component';

export interface Car {
  id: number;
  brand: string;
  price: number;
}

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    GridComponent,
    GridCellDirective,
    GridPaginationComponent,
    GridPaginationDirective,
  ],
  template: `
    <table
      appGrid
      appGridPagination
      #pagination="pagination"
      [data]="data()"
      [columns]="columns()"
    >
      <td *appCell="let row; key: 'brand'">{{ row.brand }}</td>
      <td *appCell="let row; key: 'price'">{{ row.price }}</td>
    </table>
    <app-grid-pagination [pagination]="pagination" />
  `,
  providers: [{ provide: Strategy, useClass: QueryStrategy }],
})
export class CarsComponent {
  public readonly columns = signal<Column<Car>[]>([
    { key: 'brand', label: 'Brand', sortable: true },
    { key: 'price', label: 'Price', sortable: true },
  ]);

  public data = signal<Car[]>([
    { id: 1, brand: 'Toyota', price: 17458 },
    { id: 2, brand: 'BMW', price: 32044 },
    { id: 3, brand: 'Honda', price: 19873 },
    { id: 4, brand: 'Ford', price: 23900 },
    { id: 5, brand: 'Mercedes', price: 45600 },
    { id: 6, brand: 'Audi', price: 38420 },
    { id: 7, brand: 'Hyundai', price: 17500 },
    { id: 8, brand: 'Kia', price: 16840 },
    { id: 9, brand: 'Volkswagen', price: 22130 },
    { id: 10, brand: 'Tesla', price: 49990 },
    { id: 11, brand: 'Mazda', price: 21000 },
    { id: 12, brand: 'Chevrolet', price: 20200 },
    { id: 13, brand: 'Nissan', price: 19050 },
    { id: 14, brand: 'Subaru', price: 23090 },
    { id: 15, brand: 'Peugeot', price: 18800 },
    { id: 16, brand: 'Renault', price: 17590 },
    { id: 17, brand: 'Fiat', price: 16230 },
    { id: 18, brand: 'Volvo', price: 33450 },
    { id: 19, brand: 'Jeep', price: 28500 },
    { id: 20, brand: 'Skoda', price: 20300 },
    { id: 21, brand: 'Toyota', price: 18100 },
    { id: 22, brand: 'BMW', price: 34700 },
    { id: 23, brand: 'Honda', price: 21450 },
    { id: 24, brand: 'Ford', price: 24010 },
    { id: 25, brand: 'Mercedes', price: 47000 },
    { id: 26, brand: 'Audi', price: 39800 },
    { id: 27, brand: 'Hyundai', price: 18300 },
    { id: 28, brand: 'Kia', price: 17190 },
    { id: 29, brand: 'Volkswagen', price: 22880 },
    { id: 30, brand: 'Tesla', price: 52000 },
    { id: 31, brand: 'Mazda', price: 21600 },
    { id: 32, brand: 'Chevrolet', price: 20450 },
    { id: 33, brand: 'Nissan', price: 19200 },
    { id: 34, brand: 'Subaru', price: 23800 },
    { id: 35, brand: 'Peugeot', price: 19300 },
    { id: 36, brand: 'Renault', price: 17750 },
    { id: 37, brand: 'Fiat', price: 16400 },
    { id: 38, brand: 'Volvo', price: 34000 },
    { id: 39, brand: 'Jeep', price: 29500 },
    { id: 40, brand: 'Skoda', price: 20900 },
    { id: 41, brand: 'Toyota', price: 18600 },
    { id: 42, brand: 'BMW', price: 35500 },
    { id: 43, brand: 'Honda', price: 21990 },
    { id: 44, brand: 'Ford', price: 24320 },
    { id: 45, brand: 'Mercedes', price: 48200 },
    { id: 46, brand: 'Audi', price: 40500 },
    { id: 47, brand: 'Hyundai', price: 18700 },
    { id: 48, brand: 'Kia', price: 17480 },
    { id: 49, brand: 'Volkswagen', price: 23210 },
    { id: 50, brand: 'Tesla', price: 53000 },
    { id: 51, brand: 'Mazda', price: 22000 },
    { id: 52, brand: 'Chevrolet', price: 20710 },
    { id: 53, brand: 'Nissan', price: 19500 },
    { id: 54, brand: 'Subaru', price: 24000 },
    { id: 55, brand: 'Peugeot', price: 19550 },
    { id: 56, brand: 'Renault', price: 18000 },
    { id: 57, brand: 'Fiat', price: 16600 },
    { id: 58, brand: 'Volvo', price: 34500 },
    { id: 59, brand: 'Jeep', price: 30000 },
    { id: 60, brand: 'Skoda', price: 21200 },
    { id: 61, brand: 'Toyota', price: 19000 },
    { id: 62, brand: 'BMW', price: 36000 },
    { id: 63, brand: 'Honda', price: 22500 },
    { id: 64, brand: 'Ford', price: 24750 },
    { id: 65, brand: 'Mercedes', price: 49000 },
    { id: 66, brand: 'Audi', price: 41000 },
    { id: 67, brand: 'Hyundai', price: 19050 },
    { id: 68, brand: 'Kia', price: 17700 },
    { id: 69, brand: 'Volkswagen', price: 23500 },
    { id: 70, brand: 'Tesla', price: 54000 },
    { id: 71, brand: 'Mazda', price: 22300 },
    { id: 72, brand: 'Chevrolet', price: 21000 },
    { id: 73, brand: 'Nissan', price: 19800 },
    { id: 74, brand: 'Subaru', price: 24200 },
    { id: 75, brand: 'Peugeot', price: 19890 },
    { id: 76, brand: 'Renault', price: 18200 },
    { id: 77, brand: 'Fiat', price: 16800 },
    { id: 78, brand: 'Volvo', price: 35000 },
    { id: 79, brand: 'Jeep', price: 31000 },
    { id: 80, brand: 'Skoda', price: 21500 },
    { id: 81, brand: 'Toyota', price: 19200 },
    { id: 82, brand: 'BMW', price: 36500 },
    { id: 83, brand: 'Honda', price: 23000 },
    { id: 84, brand: 'Ford', price: 25000 },
    { id: 85, brand: 'Mercedes', price: 50000 },
    { id: 86, brand: 'Audi', price: 41500 },
    { id: 87, brand: 'Hyundai', price: 19300 },
    { id: 88, brand: 'Kia', price: 17900 },
    { id: 89, brand: 'Volkswagen', price: 23800 },
    { id: 90, brand: 'Tesla', price: 55000 },
    { id: 91, brand: 'Mazda', price: 22600 },
    { id: 92, brand: 'Chevrolet', price: 21200 },
    { id: 93, brand: 'Nissan', price: 20000 },
    { id: 94, brand: 'Subaru', price: 24500 },
    { id: 95, brand: 'Peugeot', price: 20000 },
    { id: 96, brand: 'Renault', price: 18400 },
    { id: 97, brand: 'Fiat', price: 17000 },
    { id: 98, brand: 'Volvo', price: 35500 },
    { id: 99, brand: 'Jeep', price: 31500 },
    { id: 100, brand: 'Skoda', price: 21800 },
  ]);
}
