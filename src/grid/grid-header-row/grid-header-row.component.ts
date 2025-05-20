import { Component, inject } from '@angular/core';
import { GridHeaderSortLabelComponent } from 'grid/grid-header-sort-label/grid-header-sort-label.component';
import { GridService } from 'grid/grid-service/grid.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-header-row]',
  standalone: true,
  imports: [GridHeaderSortLabelComponent],
  template: `
    @for (col of grid.getColumns(); track col.key) {
      @if (!col.sortable) {
        <th>
          {{ col.label }}
        </th>
      } @else {
        <th (click)="grid.onSortColumnClick(col)" class="cursor-pointer">
          <div class="flex items-center">
            <p class="flex-grow">{{ col.label }}</p>
            <app-grid-header-sort-label [column]="col" />
          </div>
        </th>
      }
    }
  `,
})
export class GridHeaderRowComponent {
  protected grid = inject(GridService);
}
