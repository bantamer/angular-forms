import { Component, inject } from '@angular/core';
import { GridService } from 'grid/grid-service/grid.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-header-row]',
  standalone: true,
  template: `
    @for (col of grid.getColumns(); track col.key) {
      @if (!col.sortable) {
        <th>
          {{ col.label }}
        </th>
      } @else {
        <th (click)="grid.onSortColumnClick(col)">
          {{ col.label }}
        </th>
      }
    }
  `,
})
export class GridHeaderRowComponent {
  protected grid = inject(GridService);
}
