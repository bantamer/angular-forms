import { Component, inject } from '@angular/core';
import { GridService } from 'grid/grid-service/grid.service';

@Component({
  selector: 'app-grid-pagination',
  standalone: true,
  template: `
    <div class="flex w-full gap-4 px-6 py-2 justify-end">
      <button
        class="px-4 py-2 cursor-pointer border rounded-2xl disabled:bg-gray-100 disabled:cursor-default"
        (click)="grid.prevPage()"
        [disabled]="!grid.getPaginationStatus()?.hasPrevPage"
      >
        Prev
      </button>
      <button
        class="px-4 py-2 cursor-pointer border rounded-2xl disabled:bg-gray-100 disabled:cursor-default"
        (click)="grid.nextPage()"
        [disabled]="!grid.getPaginationStatus()?.hasNextPage"
      >
        Next
      </button>
    </div>
  `,
})
export class GridPaginationComponent {
  protected grid = inject(GridService);
}
