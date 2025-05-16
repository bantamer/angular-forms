import {
  Component,
  contentChildren,
  effect,
  inject,
  input,
} from '@angular/core';

import { Column, GridService } from './grid-service/grid.service';
import { GridHeaderRowComponent } from './grid-header-row/grid-header-row.component';
import { GridCellDirective } from './grid-cell/grid-cell.directive';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[app-grid]',
  standalone: true,
  imports: [GridHeaderRowComponent, NgTemplateOutlet],
  providers: [GridService],
  template: `
    <thead class="bg-gray-100">
      <tr app-header-row></tr>
    </thead>
    <tbody>
      @for (row of grid.getData(); track row.id) {
        <tr class="hover:bg-gray-100">
          @for (col of columns(); track col.key) {
            @if (getCell(col.key); as cell) {
              <ng-container
                *ngTemplateOutlet="
                  cell?.templateRef ?? null;
                  context: { $implicit: row }
                "
              ></ng-container>
            }
          }
        </tr>
      }
    </tbody>
  `,
  styles: [
    `
      :host {
        border-collapse: collapse;
        width: 100%;
      }
    `,
  ],
})
export class GridComponent<T extends { id: unknown }> {
  public grid = inject(GridService<T>);
  public data = input<T[]>();
  public columns = input<Column<T>[]>();
  public cells = contentChildren(GridCellDirective);

  public getCell(key: keyof T) {
    return this.cells().find((c) => c.key() === key)!;
  }

  constructor() {
    effect(() => {
      this.grid.setData(this.data());
      this.grid.setColumns(this.columns());
    });
  }
}
