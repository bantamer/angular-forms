import { Component, input } from '@angular/core';
import { GridPaginationDirective } from './grid-pagination.directive';

@Component({
  selector: 'app-grid-pagination',
  standalone: true,
  template: `
    <div class="flex w-full gap-4 px-6 py-2 justify-end">
      <button
        class="px-4 py-2 cursor-pointer border rounded-2xl disabled:bg-gray-100 disabled:cursor-default"
        (click)="pagination().prevPage()"
        [disabled]="!pagination().getPaginationStatus()?.hasPrevPage"
      >
        Prev
      </button>
      <button
        class="px-4 py-2 cursor-pointer border rounded-2xl disabled:bg-gray-100 disabled:cursor-default"
        (click)="pagination().nextPage()"
        [disabled]="!pagination().getPaginationStatus()?.hasNextPage"
      >
        Next
      </button>
    </div>
  `,
})
export class GridPaginationComponent {
  public pagination = input.required<GridPaginationDirective>();
}
