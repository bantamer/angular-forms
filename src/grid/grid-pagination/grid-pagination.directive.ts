import { Directive, inject } from '@angular/core';
import { GridService } from 'grid/grid-service/grid.service';

@Directive({
  selector: '[appGridPagination]',
  standalone: true,
  exportAs: 'pagination',
})
export class GridPaginationDirective {
  private readonly grid = inject(GridService, { host: true });

  getPaginationStatus() {
    return this.grid.getPaginationStatus();
  }

  nextPage() {
    this.grid.nextPage();
  }

  prevPage() {
    this.grid.prevPage();
  }
}
