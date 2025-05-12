import { Component, inject } from '@angular/core';

import { GridService } from './grid-service/grid.service';
import { GridHeaderRowComponent } from './grid-header-row/grid-header-row.component';
import { GridRowComponent } from './grid-row/grid-row.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'table[app-grid]',
  standalone: true,
  imports: [GridHeaderRowComponent, GridRowComponent],
  template: `
    <thead class="bg-gray-100">
      <tr app-header-row></tr>
    </thead>
    <tbody>
      @for (item of grid.data(); track item.Name) {
        <tr
          class="hover:bg-gray-100"
          app-row
          [row]="item"
          [columns]="grid.columns()"
        ></tr>
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
export class GridComponent {
  protected grid = inject(GridService);
}
