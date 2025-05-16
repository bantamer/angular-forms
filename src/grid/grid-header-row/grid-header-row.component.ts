import { Component, inject } from '@angular/core';
import { GridService } from 'grid/grid-service/grid.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-header-row]',
  standalone: true,
  template: `
    @for (col of grid.getColumns(); track col.key) {
      <th>
        <div class="flex">
          <div class="flex flex-grow justify-center">
            {{ col.label }}
          </div>
        </div>
      </th>
    }
  `,
})
export class GridHeaderRowComponent {
  protected grid = inject(GridService);
}
