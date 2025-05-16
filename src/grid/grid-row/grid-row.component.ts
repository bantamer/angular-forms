import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, input } from '@angular/core';
import { GridCellDirective } from 'grid/grid-cell/grid-cell.directive';
import { Column, WithId } from 'grid/grid-service/grid.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tr[app-row]',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <ng-content>
      @for (col of columns(); track col.key) {
        @let cell = getCell(col.key);
        <ng-container
          *ngTemplateOutlet="cell?.templateRef ?? null; context: { row: row() }"
        />
      }
    </ng-content>
  `,
})
export class GridRowComponent<DataSourceT extends WithId<object>> {
  public row = input<DataSourceT>();
  public columns = input<Column<DataSourceT>[]>();
  public cells = contentChildren(GridCellDirective);

  getCell(key: keyof DataSourceT) {
    return this.cells().find((c) => c.cellKey() === key);
  }
}
