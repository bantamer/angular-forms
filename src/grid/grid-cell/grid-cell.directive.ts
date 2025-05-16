import { Directive, input, TemplateRef } from '@angular/core';
import { WithId } from 'grid/grid-service/grid.service';

@Directive({
  selector: '[appCell]',
  standalone: true,
})
export class GridCellDirective<DataSourceT = WithId<object>> {
  public cellKey = input<keyof DataSourceT>();

  constructor(public templateRef: TemplateRef<unknown>) {}
}
