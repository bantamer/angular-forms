import { Component, computed, inject, input } from '@angular/core';

import { Column, GridService } from 'grid/grid-service/grid.service';
import { Order } from 'grid/grid-strategy/grid-strategy';

@Component({
  selector: 'app-grid-header-sort-label',
  standalone: true,
  template: `
    <div class="flex h-10 w-10 items-center justify-center">
      @if (currentOrderIcon()) {
        {{ currentOrderIcon() }}
      }
    </div>
  `,
})
export class GridHeaderSortLabelComponent<T extends { id: unknown }> {
  private grid = inject(GridService);
  public column = input<Column<T>>();
  private currentSort = this.grid.getCurrentSort();

  public currentOrderIcon = computed(() => {
    if (this.column()?.key !== this.currentSort().by) {
      return;
    }

    return this.currentSort().order === Order.Asc ? '▼' : '▲';
  });
}
