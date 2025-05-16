import { Component, effect, inject, input } from '@angular/core';

import { Column, GridService, WithId } from './grid-service/grid.service';
import { GridHeaderRowComponent } from './grid-header-row/grid-header-row.component';
import { GridRowComponent } from './grid-row/grid-row.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[app-grid]',
  standalone: true,
  imports: [GridHeaderRowComponent, GridRowComponent],
  providers: [GridService],
  template: `
    <thead class="bg-gray-100">
      <tr app-header-row></tr>
    </thead>
    <tbody>
      @for (item of grid.getData(); track item.id) {
        <tr
          class="hover:bg-gray-100"
          app-row
          [row]="item"
          [columns]="grid.getColumns()"
        >
          <ng-content />
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
export class GridComponent<DataSourceT extends WithId<object>> {
  public grid = inject(GridService<DataSourceT>);
  public data = input<DataSourceT[]>();
  public columns = input<Column<DataSourceT>[]>();

  constructor() {
    effect(() => {
      this.grid.setData(this.data());
      this.grid.setColumns(this.columns());
    });
  }
}
