import { Component, inject } from '@angular/core';
import { GridService } from 'grid/grid-service/grid.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-header-row]',
  standalone: true,
  template: ` @for (col of grid.columns(); track col) {
    <th
      (click)="grid.sortBy(col)"
      class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <div class="flex">
        <div class="flex flex-grow justify-center">
          {{ col }}
        </div>
        <span class="w-4 h-4">
          @if (grid.getCurrentSortColumn() === col) {
            {{ grid.getSortOrderIsAsc() ? '▲' : '▼' }}
          }
        </span>
      </div>
    </th>
  }`,
})
export class GridHeaderRowComponent {
  protected grid = inject(GridService);
}
